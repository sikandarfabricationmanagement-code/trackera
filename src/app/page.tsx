'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useRole } from '@/hooks/use-role';
import { Logo } from '@/components/logo';
import { Users, ChefHat } from 'lucide-react';
import { useEffect } from 'react';

export default function LoginPage() {
  const { setRole, role } = useRole();
  const router = useRouter();

  useEffect(() => {
    if (role) {
      router.push('/dashboard');
    }
  }, [role, router]);

  const handleLogin = (selectedRole: 'manager' | 'staff') => {
    setRole(selectedRole);
    router.push('/dashboard');
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/40 p-4">
      <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      <div className="mb-8 flex items-center gap-4 text-primary">
        <Logo className="h-12 w-12" />
        <h1 className="font-headline text-5xl font-bold tracking-tighter">Trackera</h1>
      </div>
      <Card className="w-full max-w-md shadow-2xl rounded-2xl">
        <CardHeader className="text-center">
          <CardTitle className="font-headline text-3xl tracking-tight">Welcome Back</CardTitle>
          <CardDescription>Select your role to sign in to your dashboard</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4">
            <Button
              variant="outline"
              size="lg"
              className="h-28 flex-col gap-2 text-lg hover:bg-primary/5 hover:border-primary transition-all duration-300 group"
              onClick={() => handleLogin('manager')}
            >
              <div className="flex items-center gap-4">
                <Users className="h-8 w-8 text-primary transition-transform duration-300 group-hover:scale-110" />
                <div className="text-left">
                    <p className="font-semibold">Manager</p>
                    <p className="text-sm text-muted-foreground">Access admin and analytics tools.</p>
                </div>
              </div>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="h-28 flex-col gap-2 text-lg hover:bg-primary/5 hover:border-primary transition-all duration-300 group"
              onClick={() => handleLogin('staff')}
            >
               <div className="flex items-center gap-4">
                <ChefHat className="h-8 w-8 text-primary transition-transform duration-300 group-hover:scale-110" />
                 <div className="text-left">
                    <p className="font-semibold">Staff</p>
                    <p className="text-sm text-muted-foreground">Access orders and table management.</p>
                </div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
      <footer className="mt-8 text-center text-sm text-muted-foreground">
        <p>Made by Optineura. &copy; {new Date().getFullYear()} Trackera. All rights reserved.</p>
      </footer>
    </div>
  );
}
