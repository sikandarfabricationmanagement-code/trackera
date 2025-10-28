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
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="mb-8 flex items-center gap-4 text-primary">
        <Logo className="h-12 w-12" />
        <h1 className="font-headline text-5xl font-bold">RestroZen</h1>
      </div>
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center">
          <CardTitle className="font-headline text-2xl">Welcome Back!</CardTitle>
          <CardDescription>Please select your role to continue</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Button
              variant="outline"
              className="h-24 flex-col gap-2 text-lg"
              onClick={() => handleLogin('manager')}
            >
              <Users className="h-8 w-8" />
              Manager
            </Button>
            <Button
              variant="outline"
              className="h-24 flex-col gap-2 text-lg"
              onClick={() => handleLogin('staff')}
            >
              <ChefHat className="h-8 w-8" />
              Staff
            </Button>
          </div>
        </CardContent>
      </Card>
      <footer className="mt-8 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} RestroZen. All rights reserved.</p>
      </footer>
    </div>
  );
}
