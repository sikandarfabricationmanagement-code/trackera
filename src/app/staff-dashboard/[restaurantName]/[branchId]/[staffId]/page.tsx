'use client';
import { useRole } from '@/hooks/use-role';
import { useRouter, useParams } from 'next/navigation';
import { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';

export default function StaffDashboardPage() {
  const { role, identity, isMounted, logout } = useRole();
  const router = useRouter();
  const params = useParams();
  
  const { restaurantName, branchId, staffId } = params;

  useEffect(() => {
    if (isMounted) {
      if (
        role !== 'staff' ||
        identity?.restaurantName !== restaurantName ||
        identity?.branchId !== branchId ||
        identity?.staffId !== staffId
      ) {
        router.push('/login');
      }
    }
  }, [role, isMounted, router, identity, restaurantName, branchId, staffId]);

  if (!isMounted || role !== 'staff') {
    return <div>Loading...</div>; // Or a proper loader
  }

  return (
    <div className="flex flex-1 items-center justify-center">
        <Card className="w-full max-w-md">
            <CardHeader className="text-center">
                <CardTitle className="font-headline text-2xl">Welcome, {staffId}</CardTitle>
                <CardDescription>
                    You are logged into Branch #{branchId} of {restaurantName}.
                </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-4">
                <p className="text-muted-foreground">Your dashboard view will be available here.</p>
                <Button variant="outline" onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4"/>
                    Logout
                </Button>
            </CardContent>
        </Card>
    </div>
  );
}
