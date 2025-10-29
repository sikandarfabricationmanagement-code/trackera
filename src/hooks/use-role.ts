"use client";
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

export type UserRole = 'admin' | 'manager' | 'staff' | null;

export interface UserIdentity {
  // Common
  role: UserRole;
  // Manager
  restaurantName?: string;
  managerEmail?: string;
  // Staff
  branchId?: string;
  staffId?: string;
}

const initialIdentity: UserIdentity = {
    role: null,
};

export const useRole = () => {
  const [identity, setIdentity] = useState<UserIdentity>(initialIdentity);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    let storedIdentity: UserIdentity | null = null;
    try {
      const item = localStorage.getItem('userSession');
      if (item) {
        storedIdentity = JSON.parse(item) as UserIdentity;
      }
    } catch (error) {
       // Silently fail if localStorage is not available
    }

    if (storedIdentity && storedIdentity.role) {
      setIdentity(storedIdentity);
    }
    setIsMounted(true);
  }, []);

  const setRole = useCallback((role: UserRole, details: Omit<UserIdentity, 'role'> = {}) => {
    const newIdentity: UserIdentity = { ...details, role };
    setIdentity(newIdentity);
    try {
        if (role) {
            localStorage.setItem('userSession', JSON.stringify(newIdentity));
        } else {
            localStorage.removeItem('userSession');
        }
    } catch (error) {
       // Silently fail
    }
  }, []);
  
  const logout = useCallback(() => {
    setIdentity(initialIdentity);
     try {
        localStorage.removeItem('userSession');
     } catch(error) {}
    router.push('/login');
  }, [router]);

  return { 
    identity: isMounted ? identity : initialIdentity, 
    role: isMounted ? identity.role : null,
    setRole, 
    logout, 
    isMounted 
  };
};
