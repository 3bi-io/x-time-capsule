import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';

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

  useEffect(() => {
    // Temporarily disabled until migration is approved
    // Once migration is approved, this will fetch from the notifications table
    setNotifications([]);
    setLoading(false);
  }, [user]);

  const markAsRead = async (notificationId: string) => {
    // Temporarily disabled until migration is approved
    console.log('Mark as read:', notificationId);
  };

  const refreshNotifications = async () => {
    // Temporarily disabled until migration is approved
    setNotifications([]);
  };

  return { notifications, loading, markAsRead, refreshNotifications };
};
