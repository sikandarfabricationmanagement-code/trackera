'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  BarChart2,
  Building,
  ClipboardList,
  LayoutDashboard,
  Users,
} from 'lucide-react';
import type { UserRole } from '@/hooks/use-role';

const managerNavItems = [
  { title: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { title: 'Analytics', href: '/analytics', icon: BarChart2 },
  { title: 'Management', href: '/management', icon: Building },
  { title: 'Orders', href: '/orders', icon: ClipboardList },
];

const staffNavItems = [
  { title: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { title: 'Orders', href: '/orders', icon: ClipboardList },
];

interface MainNavProps {
  role: UserRole;
}

export function MainNav({ role }: MainNavProps) {
  const pathname = usePathname();
  const navItems = role === 'manager' ? managerNavItems : staffNavItems;

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
