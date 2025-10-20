import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';

export const useAdminCheck = () => {
  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Temporarily disabled until migration is approved
    // Once migration is approved, this will check the user_roles table
    setIsAdmin(false);
    setLoading(false);
  }, [user]);

  return { isAdmin, loading };
};
