-- Create profiles table for user data
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Users can view their own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" 
ON public.profiles 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Create time_capsules table for vault data
CREATE TABLE public.time_capsules (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  content JSONB,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on time_capsules
ALTER TABLE public.time_capsules ENABLE ROW LEVEL SECURITY;

-- Create policies for time_capsules
CREATE POLICY "Users can view their own time capsules" 
ON public.time_capsules 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own time capsules" 
ON public.time_capsules 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own time capsules" 
ON public.time_capsules 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own time capsules" 
ON public.time_capsules 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create family_members table for access control
CREATE TABLE public.family_members (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  vault_owner_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  member_email TEXT NOT NULL,
  member_name TEXT NOT NULL,
  access_level TEXT NOT NULL DEFAULT 'limited' CHECK (access_level IN ('limited', 'full')),
  is_verified BOOLEAN NOT NULL DEFAULT false,
  invited_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  verified_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(vault_owner_id, member_email)
);

-- Enable RLS on family_members
ALTER TABLE public.family_members ENABLE ROW LEVEL SECURITY;

-- Create policies for family_members
CREATE POLICY "Vault owners can manage their family members" 
ON public.family_members 
FOR ALL 
USING (auth.uid() = vault_owner_id);

-- Create verification_requests table
CREATE TABLE public.verification_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  requester_email TEXT NOT NULL,
  vault_owner_email TEXT NOT NULL,
  full_name TEXT NOT NULL,
  phone_number TEXT,
  relationship TEXT NOT NULL,
  document_url TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in_review', 'approved', 'rejected')),
  admin_notes TEXT,
  submitted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  reviewed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on verification_requests
ALTER TABLE public.verification_requests ENABLE ROW LEVEL SECURITY;

-- Create policies for verification_requests
CREATE POLICY "Anyone can insert verification requests" 
ON public.verification_requests 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Users can view their own verification requests" 
ON public.verification_requests 
FOR SELECT 
USING (requester_email = (SELECT email FROM auth.users WHERE id = auth.uid()));

-- Create storage buckets for file uploads
INSERT INTO storage.buckets (id, name, public) 
VALUES ('verification-documents', 'verification-documents', false);

-- Create storage policies for verification documents
CREATE POLICY "Users can upload verification documents" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'verification-documents');

CREATE POLICY "Users can view their own verification documents" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'verification-documents' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_time_capsules_updated_at
  BEFORE UPDATE ON public.time_capsules
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'full_name', 'User'));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();