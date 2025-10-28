'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useRole } from '@/hooks/use-role';
import { AppHeader } from '@/components/app-header';
import { MainNav } from '@/components/main-nav';
import { Logo } from '@/components/logo';
import { Skeleton } from '@/components/ui/skeleton';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { role, isMounted } = useRole();
  const router = useRouter();

  useEffect(() => {
    if (isMounted && !role) {
      router.push('/');
    }
  }, [role, isMounted, router]);

  if (!isMounted || !role) {
    return (
        <div className="flex min-h-screen w-full flex-col">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Skeleton className="h-8 w-32" />
            <div className="ml-auto">
              <Skeleton className="h-8 w-8 rounded-full" />
            </div>
          </div>
          <div className="flex flex-1">
            <div className="hidden border-r bg-muted/40 md:block">
              <div className="flex h-full max-h-screen flex-col gap-2 p-4">
                <Skeleton className="h-8 w-40 mb-4" />
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
              </div>
            </div>
            <div className="flex-1 p-4">
              <Skeleton className="h-full w-full" />
            </div>
          </div>
        </div>
    );
  }

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <a href="/dashboard" className="flex items-center gap-2 font-semibold">
              <Logo className="h-6 w-6 text-primary" />
              <span className="font-headline">RestroZen</span>
            </a>
          </div>
          <div className="flex-1">
            <MainNav role={role} />
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <AppHeader />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-background">
          {children}
        </main>
      </div>
    </div>
  );
}
