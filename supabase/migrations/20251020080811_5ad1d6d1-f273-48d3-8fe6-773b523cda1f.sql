-- Phase 4: Database Optimization & Phase 6 Advanced Features

-- =====================================================
-- PHASE 4: ADD INDEXES FOR PERFORMANCE
-- =====================================================

-- Time capsules indexes
CREATE INDEX IF NOT EXISTS idx_time_capsules_user_active 
ON public.time_capsules(user_id, is_active) 
WHERE is_active = true;

CREATE INDEX IF NOT EXISTS idx_time_capsules_category 
ON public.time_capsules(category);

-- Verification requests indexes
CREATE INDEX IF NOT EXISTS idx_verification_status 
ON public.verification_requests(status);

CREATE INDEX IF NOT EXISTS idx_verification_user_id 
ON public.verification_requests(user_id);

CREATE INDEX IF NOT EXISTS idx_verification_vault_owner 
ON public.verification_requests(vault_owner_email);

-- Family members indexes
CREATE INDEX IF NOT EXISTS idx_family_vault_owner 
ON public.family_members(vault_owner_id);

CREATE INDEX IF NOT EXISTS idx_family_verified 
ON public.family_members(is_verified) 
WHERE is_verified = true;

CREATE INDEX IF NOT EXISTS idx_family_member_email 
ON public.family_members(member_email);

-- =====================================================
-- PHASE 4: ADD DATABASE TRIGGERS
-- =====================================================

-- Auto-update family_members.verified_at when is_verified changes to true
CREATE OR REPLACE FUNCTION public.update_family_member_verified_at()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  IF NEW.is_verified = true AND OLD.is_verified = false THEN
    NEW.verified_at = now();
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER trigger_update_family_member_verified_at
  BEFORE UPDATE ON public.family_members
  FOR EACH ROW
  EXECUTE FUNCTION public.update_family_member_verified_at();

-- =====================================================
-- PHASE 4: ADD DATABASE CONSTRAINTS
-- =====================================================

-- Ensure access_level is valid
ALTER TABLE public.family_members
DROP CONSTRAINT IF EXISTS check_access_level;

ALTER TABLE public.family_members
ADD CONSTRAINT check_access_level 
CHECK (access_level IN ('limited', 'full'));

-- Ensure verification status is valid
ALTER TABLE public.verification_requests
DROP CONSTRAINT IF EXISTS check_verification_status;

ALTER TABLE public.verification_requests
ADD CONSTRAINT check_verification_status 
CHECK (status IN ('pending', 'approved', 'rejected'));

-- Ensure notification type is valid
ALTER TABLE public.notifications
DROP CONSTRAINT IF EXISTS check_notification_type;

ALTER TABLE public.notifications
ADD CONSTRAINT check_notification_type 
CHECK (type IN ('info', 'success', 'warning', 'error'));

-- =====================================================
-- PHASE 6: ACCESS LOGGING TABLE
-- =====================================================

CREATE TABLE public.access_logs (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    time_capsule_id uuid REFERENCES public.time_capsules(id) ON DELETE CASCADE NOT NULL,
    action text NOT NULL,
    ip_address text,
    user_agent text,
    created_at timestamptz DEFAULT now()
);

-- Enable RLS on access_logs
ALTER TABLE public.access_logs ENABLE ROW LEVEL SECURITY;

-- Indexes for access logs
CREATE INDEX idx_access_logs_user_id ON public.access_logs(user_id);
CREATE INDEX idx_access_logs_capsule_id ON public.access_logs(time_capsule_id);
CREATE INDEX idx_access_logs_created_at ON public.access_logs(created_at);

-- RLS policies for access_logs
CREATE POLICY "Users can view their own access logs"
ON public.access_logs FOR SELECT
TO authenticated
USING (user_id = auth.uid());

CREATE POLICY "Vault owners can view access logs for their capsules"
ON public.access_logs FOR SELECT
TO authenticated
USING (
  time_capsule_id IN (
    SELECT id FROM public.time_capsules WHERE user_id = auth.uid()
  )
);

CREATE POLICY "System can insert access logs"
ON public.access_logs FOR INSERT
TO authenticated
WITH CHECK (true);

-- =====================================================
-- PHASE 2: UPDATE FAMILY MEMBER RLS FOR VAULT ACCESS
-- =====================================================

-- Create helper function to check family member access
CREATE OR REPLACE FUNCTION public.has_family_access(_user_id uuid, _capsule_id uuid, _access_level text)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.family_members fm
    JOIN public.time_capsules tc ON tc.user_id = fm.vault_owner_id
    WHERE fm.member_email = (SELECT email FROM auth.users WHERE id = _user_id)
      AND fm.is_verified = true
      AND tc.id = _capsule_id
      AND (
        (_access_level = 'limited' AND fm.access_level IN ('limited', 'full'))
        OR (_access_level = 'full' AND fm.access_level = 'full')
      )
  )
$$;

-- Update time_capsules RLS to allow family member access
DROP POLICY IF EXISTS "Users can view their own time capsules" ON public.time_capsules;

CREATE POLICY "Users can view their own time capsules"
ON public.time_capsules FOR SELECT
TO authenticated
USING (
  user_id = auth.uid() 
  OR public.has_family_access(auth.uid(), id, 'limited')
);

-- Only vault owners can modify capsules
CREATE POLICY "Only owners can update their capsules"
ON public.time_capsules FOR UPDATE
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- =====================================================
-- PHASE 6: TIME-BASED ACCESS FEATURE
-- =====================================================

-- Add unlock_date to time_capsules
ALTER TABLE public.time_capsules
ADD COLUMN IF NOT EXISTS unlock_date timestamptz;

-- Create function to check if capsule is unlocked
CREATE OR REPLACE FUNCTION public.is_capsule_unlocked(_capsule_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT 
    CASE 
      WHEN unlock_date IS NULL THEN true
      WHEN unlock_date <= now() THEN true
      ELSE false
    END
  FROM public.time_capsules
  WHERE id = _capsule_id
$$;