import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: string;
  is_read: boolean;
  created_at: string;
}

export const useNotifications = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = useSupabaseClient();

  useEffect(() => {
    const fetchNotifications = async () => {
      if (user) {
        try {
          const { data, error } = await supabase
            .from('notifications')
            .select('*')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false });

          if (error) {
            console.error('Error fetching notifications:', error);
          }

          if (data) {
            // Type assertion to ensure data matches the Notification type
            setNotifications(data as Notification[]);
          }
        } catch (error) {
          console.error('Unexpected error fetching notifications:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchNotifications();

    // Subscribe to real-time updates
    const channel = supabase
      .channel('public:notifications')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'notifications', filter: `user_id=eq.${user?.id}` },
        (payload) => {
          if (payload.eventType === 'INSERT' || payload.eventType === 'UPDATE' || payload.eventType === 'DELETE') {
            refreshNotifications();
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, supabase]);

  const markAsRead = async (notificationId: string) => {
    try {
      const { error } = await supabase
        .from('notifications')
        .update({ is_read: true })
        .eq('id', notificationId);

      if (error) {
        console.error('Error marking notification as read:', error);
      } else {
        // Optimistically update the local state
        setNotifications(notifications.map(n => n.id === notificationId ? { ...n, is_read: true } : n));
      }
    } catch (error) {
      console.error('Unexpected error marking notification as read:', error);
    }
  };

  const refreshNotifications = async () => {
    if (user) {
      try {
        const { data, error } = await supabase
          .from('notifications')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error refreshing notifications:', error);
        }

        if (data) {
          setNotifications(data as Notification[]);
        }
      } catch (error) {
        console.error('Unexpected error refreshing notifications:', error);
      }
    }
  };

  return { notifications, loading, markAsRead, refreshNotifications };
};
