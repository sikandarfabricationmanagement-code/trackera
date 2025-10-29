'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useRole } from '@/hooks/use-role';
import { DollarSign, Users, ClipboardList, Utensils, Building } from 'lucide-react';
import { useRouter } from 'next/navigation';

const ManagerDashboard = () => (
  <>
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹4,52,318.90</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Staff</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+23</div>
            <p className="text-xs text-muted-foreground">Across all branches</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Orders Today</CardTitle>
            <ClipboardList className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+12,234</div>
            <p className="text-xs text-muted-foreground">+19% from yesterday</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Branches</CardTitle>
            <Utensils className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+3</div>
            <p className="text-xs text-muted-foreground">out of 4 total</p>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
            <CardTitle className="font-headline">Recent Activity</CardTitle>
            <CardDescription>An overview of recent events across your restaurants.</CardDescription>
        </CardHeader>
        <CardContent>
            {/* This would be a feed of activities */}
            <ul className="space-y-2">
                <li className="text-sm text-muted-foreground"><span className="font-semibold text-foreground">Downtown Branch</span> just hit its daily sales target.</li>
                <li className="text-sm text-muted-foreground"><span className="font-semibold text-foreground">New Waiter</span>, Charlie Brown, was added to the team.</li>
                <li className="text-sm text-muted-foreground">Daily sales report for <span className="font-semibold text-foreground">Uptown Branch</span> is ready.</li>
            </ul>
        </CardContent>
      </Card>
  </>
);

const StaffDashboard = () => {
    const router = useRouter();
    return (
        <>
        <div className="flex items-center">
            <h1 className="text-lg font-semibold md:text-2xl font-headline">Staff Dashboard</h1>
        </div>
        <div
            className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
        >
            <div className="flex flex-col items-center gap-1 text-center">
            <h3 className="text-2xl font-bold tracking-tight font-headline">
                Welcome to your dashboard
            </h3>
            <p className="text-sm text-muted-foreground">
                You can start taking orders or view table status.
            </p>
            <button
                onClick={() => router.push('/orders')}
                className="mt-4 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
            >
                Go to Orders
            </button>
            </div>
        </div>
        </>
    )
};

const SuperAdminDashboard = () => (
    <>
      <div className="flex items-center">
          <h1 className="text-lg font-semibold md:text-2xl font-headline">Super Admin Dashboard</h1>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Restaurants</CardTitle>
              <Building className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">150</div>
              <p className="text-xs text-muted-foreground">+10% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹1.2M</div>
              <p className="text-xs text-muted-foreground">+5.2% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5,302</div>
              <p className="text-xs text-muted-foreground">Across all restaurants</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Support Tickets</CardTitle>
              <ClipboardList className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">Open tickets</p>
            </CardContent>
          </Card>
        </div>
    </>
);

const renderDashboard = (role: string | null) => {
    switch (role) {
        case 'manager':
            return <ManagerDashboard />;
        case 'staff':
            return <StaffDashboard />;
        case 'super-admin':
            return <SuperAdminDashboard />;
        default:
            return <div>Loading...</div>;
    }
}

export default function DashboardPage() {
  const { role } = useRole();

  return (
    <div className="flex flex-col gap-4">
      {renderDashboard(role)}
    </div>
  );
}
