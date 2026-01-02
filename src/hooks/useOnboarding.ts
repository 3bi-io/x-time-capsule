import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';

const ONBOARDING_KEY = 'time_capsule_onboarding_complete';

export const useOnboarding = () => {
  const { user } = useAuth();
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [isComplete, setIsComplete] = useState(true);

  useEffect(() => {
    if (!user) return;

    // Check if user has completed onboarding
    const storageKey = `${ONBOARDING_KEY}_${user.id}`;
    const completed = localStorage.getItem(storageKey);
    
    // Check if this is a new user (created within last 5 minutes)
    const createdAt = new Date(user.created_at || Date.now());
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
    const isNewUser = createdAt > fiveMinutesAgo;

    if (!completed && isNewUser) {
      setShowOnboarding(true);
      setIsComplete(false);
    } else if (!completed) {
      // Not a brand new user but hasn't completed - still show
      setIsComplete(false);
    }
  }, [user]);

  const completeOnboarding = () => {
    if (!user) return;
    
    const storageKey = `${ONBOARDING_KEY}_${user.id}`;
    localStorage.setItem(storageKey, 'true');
    setShowOnboarding(false);
    setIsComplete(true);
  };

  const startOnboarding = () => {
    setShowOnboarding(true);
  };

  const dismissOnboarding = () => {
    setShowOnboarding(false);
  };

  const resetOnboarding = () => {
    if (!user) return;
    
    const storageKey = `${ONBOARDING_KEY}_${user.id}`;
    localStorage.removeItem(storageKey);
    setIsComplete(false);
  };

  return {
    showOnboarding,
    isComplete,
    completeOnboarding,
    startOnboarding,
    dismissOnboarding,
    resetOnboarding,
  };
};
