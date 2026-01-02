import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface FamilyMember {
  id: string;
  member_name: string;
  member_email: string;
  access_level: string;
  is_verified: boolean;
  invited_at: string;
}

interface FamilyMemberStats {
  total: number;
  verified: number;
  pending: number;
}

export const useFamilyMembers = () => {
  const { user } = useAuth();
  const [members, setMembers] = useState<FamilyMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<FamilyMemberStats>({
    total: 0,
    verified: 0,
    pending: 0,
  });

  const fetchMembers = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('family_members')
        .select('*')
        .eq('vault_owner_id', user.id)
        .order('invited_at', { ascending: false });

      if (error) throw error;

      const membersList = data || [];
      setMembers(membersList);
      setStats({
        total: membersList.length,
        verified: membersList.filter(m => m.is_verified).length,
        pending: membersList.filter(m => !m.is_verified).length,
      });
    } catch (error) {
      console.error('Error fetching family members:', error);
    } finally {
      setLoading(false);
    }
  };

  const addMember = async (memberData: {
    member_name: string;
    member_email: string;
    access_level: string;
  }) => {
    if (!user) throw new Error('Not authenticated');

    const { data, error } = await supabase
      .from('family_members')
      .insert({
        vault_owner_id: user.id,
        ...memberData,
      })
      .select()
      .single();

    if (error) throw error;

    setMembers(prev => [data, ...prev]);
    setStats(prev => ({
      total: prev.total + 1,
      verified: prev.verified,
      pending: prev.pending + 1,
    }));

    return data;
  };

  const removeMember = async (memberId: string) => {
    const member = members.find(m => m.id === memberId);
    
    const { error } = await supabase
      .from('family_members')
      .delete()
      .eq('id', memberId);

    if (error) throw error;

    setMembers(prev => prev.filter(m => m.id !== memberId));
    if (member) {
      setStats(prev => ({
        total: prev.total - 1,
        verified: member.is_verified ? prev.verified - 1 : prev.verified,
        pending: !member.is_verified ? prev.pending - 1 : prev.pending,
      }));
    }
  };

  const updateMember = async (memberId: string, updates: Partial<FamilyMember>) => {
    const { error } = await supabase
      .from('family_members')
      .update(updates)
      .eq('id', memberId);

    if (error) throw error;

    setMembers(prev => 
      prev.map(m => m.id === memberId ? { ...m, ...updates } : m)
    );
  };

  useEffect(() => {
    fetchMembers();
  }, [user]);

  return {
    members,
    stats,
    loading,
    addMember,
    removeMember,
    updateMember,
    refreshMembers: fetchMembers,
  };
};
