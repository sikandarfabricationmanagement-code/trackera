'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard,
  Users,
} from 'lucide-react';
import type { UserRole, UserIdentity } from '@/hooks/use-role';

const getNavItems = (identity: UserIdentity) => {
    const { role, restaurantName, branchId, staffId } = identity;
    switch(role) {
        case 'admin':
            return [
                { title: 'Dashboard', href: '/admin-dashboard', icon: LayoutDashboard }
            ];
        case 'manager':
            return [
                { title: 'Dashboard', href: `/manager-dashboard/${restaurantName}`, icon: LayoutDashboard },
            ];
        case 'staff':
            return [
                 { title: 'Dashboard', href: `/staff-dashboard/${restaurantName}/${branchId}/${staffId}`, icon: LayoutDashboard },
            ];
        default:
            return [];
    }
}


interface MainNavProps {
  identity: UserIdentity;
}

export function MainNav({ identity }: MainNavProps) {
  const pathname = usePathname();
  const navItems = getNavItems(identity);

  if (!identity.role) return null;

  return (
    <nav className="flex flex-col gap-2 px-4">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Button
            key={item.href}
            asChild
            variant={isActive ? 'default' : 'ghost'}
            className="justify-start"
          >
            <Link href={item.href}>
              <item.icon className="mr-2 h-4 w-4" />
              {item.title}
            </Link>
          </Button>
        );
      })}
    </nav>
  );
}
