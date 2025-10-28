'use client';

import { Logo } from '@/components/logo';
import { UserNav } from '@/components/user-nav';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { MainNav } from './main-nav';
import { useRole } from '@/hooks/use-role';

export function AppHeader() {
  const { role } = useRole();
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <a className="mr-6 flex items-center space-x-2" href="/dashboard">
            <Logo className="h-6 w-6" />
            <span className="hidden font-bold sm:inline-block font-headline">
              Trackera
            </span>
          </a>
        </div>
        
        <div className="md:hidden">
           <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="pr-0">
               <a className="mr-6 flex items-center space-x-2 px-4 mb-6" href="/dashboard">
                  <Logo className="h-6 w-6" />
                  <span className="font-bold sm:inline-block font-headline">
                    Trackera
                  </span>
                </a>
              <MainNav role={role} />
            </SheetContent>
          </Sheet>
        </div>

        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <nav className="flex items-center">
            <UserNav />
          </nav>
        </div>
      </div>
    </header>
  );
}
