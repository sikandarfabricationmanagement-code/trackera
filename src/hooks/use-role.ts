"use client";
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

export type UserRole = 'manager' | 'staff' | 'super-admin' | null;

export const useRole = () => {
  const [role, setRole] = useState<UserRole>(null);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    let storedRole: UserRole = null;
    try {
      storedRole = localStorage.getItem('userRole') as UserRole;
    } catch (error) {
       // Silently fail if localStorage is not available
    }

    if (storedRole && ['manager', 'staff', 'super-admin'].includes(storedRole)) {
      setRole(storedRole);
    }
    setIsMounted(true);
  }, []);

  const setRoleAndStore = useCallback((newRole: 'manager' | 'staff' | 'super-admin' | null) => {
    setRole(newRole);
    try {
      if (newRole) {
        localStorage.setItem('userRole', newRole);
      } else {
        localStorage.removeItem('userRole');
      }
    } catch (error) {
       // Silently fail if localStorage is not available
    }
  }, []);
  
  const logout = useCallback(() => {
    setRoleAndStore(null);
    router.push('/');
  }, [setRoleAndStore, router]);

  return { role: isMounted ? role : null, setRole: setRoleAndStore, logout, isMounted };
};
