import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

export interface TimeCapsule {
  id: string;
  title: string;
  description?: string;
  category: string;
  content: any;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

type NewTimeCapsule = Omit<TimeCapsule, 'id' | 'created_at' | 'updated_at' | 'is_active'>;

export const useVaultData = () => {
  const { user } = useAuth();
  const [timeCapsules, setTimeCapsules] = useState<TimeCapsule[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTimeCapsules = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('time_capsules')
        .select('*')
        .eq('user_id', user.id)
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTimeCapsules(data || []);
    } catch (error: any) {
      toast({
        title: "Error loading vault data",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const addTimeCapsule = async (capsule: NewTimeCapsule) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('time_capsules')
        .insert([{
          ...capsule,
          user_id: user.id,
        }])
        .select()
        .single();

      if (error) throw error;

      setTimeCapsules(prev => [data, ...prev]);
      toast({
        title: "Item added",
        description: "Your vault item has been saved successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Error adding item",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const updateTimeCapsule = async (id: string, updates: Partial<TimeCapsule>) => {
    try {
      const { error } = await supabase
        .from('time_capsules')
        .update(updates)
        .eq('id', id);

      if (error) throw error;

      setTimeCapsules(prev => 
        prev.map(item => item.id === id ? { ...item, ...updates } : item)
      );
    } catch (error: any) {
      toast({
        title: "Error updating item",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const deleteTimeCapsule = async (id: string) => {
    try {
      const { error } = await supabase
        .from('time_capsules')
        .update({ is_active: false })
        .eq('id', id);

      if (error) throw error;

      setTimeCapsules(prev => prev.filter(item => item.id !== id));
      toast({
        title: "Item removed",
        description: "The vault item has been removed.",
      });
    } catch (error: any) {
      toast({
        title: "Error removing item",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchTimeCapsules();
  }, [user]);

  return {
    timeCapsules,
    loading,
    addTimeCapsule,
    updateTimeCapsule,
    deleteTimeCapsule,
    refreshData: fetchTimeCapsules,
  };
};