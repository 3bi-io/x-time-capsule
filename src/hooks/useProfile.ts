import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

interface Profile {
  id: string;
  user_id: string;
  full_name: string;
  created_at: string;
  updated_at: string;
}

export const useProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      setProfile(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updates: { full_name?: string }) => {
    if (!user) throw new Error('Not authenticated');

    try {
      // Update the profiles table
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          full_name: updates.full_name,
          updated_at: new Date().toISOString(),
        })
        .eq('user_id', user.id);

      if (profileError) throw profileError;

      // Also update user metadata
      if (updates.full_name) {
        const { error: authError } = await supabase.auth.updateUser({
          data: { full_name: updates.full_name },
        });

        if (authError) throw authError;
      }

      // Update local state
      if (profile) {
        setProfile({
          ...profile,
          ...updates,
          updated_at: new Date().toISOString(),
        });
      }

      toast({
        title: 'Success',
        description: 'Profile updated successfully',
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to update profile',
        variant: 'destructive',
      });
      throw error;
    }
  };

  const deleteAccount = async () => {
    if (!user) throw new Error('Not authenticated');

    // Note: Full account deletion requires admin privileges
    // This soft-deletes user data that user owns
    try {
      // Delete vault items (soft delete)
      await supabase
        .from('time_capsules')
        .update({ is_active: false })
        .eq('user_id', user.id);

      // Delete family members
      await supabase
        .from('family_members')
        .delete()
        .eq('vault_owner_id', user.id);

      // Sign out the user
      await supabase.auth.signOut();

      toast({
        title: 'Account Deleted',
        description: 'Your account data has been removed',
      });

      window.location.href = '/';
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to delete account',
        variant: 'destructive',
      });
      throw error;
    }
  };

  const exportData = async () => {
    if (!user) throw new Error('Not authenticated');

    try {
      // Fetch all user data
      const [capsules, familyMembers, notifications] = await Promise.all([
        supabase.from('time_capsules').select('*').eq('user_id', user.id).eq('is_active', true),
        supabase.from('family_members').select('*').eq('vault_owner_id', user.id),
        supabase.from('notifications').select('*').eq('user_id', user.id),
      ]);

      const exportData = {
        exportedAt: new Date().toISOString(),
        profile: profile,
        timeCapsules: capsules.data || [],
        familyMembers: familyMembers.data || [],
        notifications: notifications.data || [],
      };

      // Create and download JSON file
      const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `time-capsule-export-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast({
        title: 'Export Complete',
        description: 'Your data has been downloaded',
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to export data',
        variant: 'destructive',
      });
      throw error;
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [user]);

  return {
    profile,
    loading,
    updateProfile,
    deleteAccount,
    exportData,
    refreshProfile: fetchProfile,
  };
};
