import { supabase } from '@/integrations/supabase/client';

export const useAccessLogger = () => {
  const logAccess = async (
    timeCapsuleId: string,
    action: 'view' | 'edit' | 'delete' | 'download'
  ) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      await supabase.from('access_logs').insert({
        user_id: user.id,
        time_capsule_id: timeCapsuleId,
        action,
        ip_address: null, // Could be populated via edge function
        user_agent: navigator.userAgent,
      });
    } catch (error) {
      console.error('Error logging access:', error);
    }
  };

  const getAccessLogs = async (timeCapsuleId: string) => {
    try {
      const { data, error } = await supabase
        .from('access_logs')
        .select('*')
        .eq('time_capsule_id', timeCapsuleId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching access logs:', error);
      return [];
    }
  };

  return { logAccess, getAccessLogs };
};
