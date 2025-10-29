'use client';
import { useRole } from '@/hooks/use-role';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

const AdminDashboard = () => <div>Admin Dashboard</div>;
const ManagerDashboard = () => <div>Manager Dashboard</div>;
const StaffDashboard = () => <div>Staff Dashboard</div>;

const renderDashboard = (role: string | null) => {
    switch (role) {
        case 'admin':
            return <AdminDashboard />;
        case 'manager':
            return <ManagerDashboard />;
        case 'staff':
            return <StaffDashboard />;
        default:
            return (
                <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
                    <div className="flex flex-col items-center gap-2 text-center">
                        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                        <h3 className="text-xl font-bold tracking-tight">Loading Dashboard...</h3>
                        <p className="text-sm text-muted-foreground">Please wait while we get things ready for you.</p>
                    </div>
                </div>
            );
    }
}

export default function DashboardPage() {
  const { role, isMounted, identity } = useRole();
  const router = useRouter();

  useEffect(() => {
    if (isMounted && !role) {
      router.push('/login');
      return;
    }
    
    if(isMounted && role) {
        switch(role) {
            case 'admin':
                router.push('/admin-dashboard');
                break;
            case 'manager':
                if(identity?.restaurantName) {
                    router.push(`/manager-dashboard/${identity.restaurantName}`);
                }
                break;
            case 'staff':
                 if(identity?.restaurantName && identity.branchId && identity.staffId) {
                    router.push(`/staff-dashboard/${identity.restaurantName}/${identity.branchId}/${identity.staffId}`);
                }
                break;
        }
    }

  }, [role, isMounted, router, identity]);


  return renderDashboard(role);
}
