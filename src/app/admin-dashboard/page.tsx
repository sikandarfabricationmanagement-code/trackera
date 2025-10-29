'use client';
import { useRole } from '@/hooks/use-role';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building, Users, GitBranch } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';

// Mock data for now, we will replace this with Firestore data
const restaurants = [
  { name: 'Shivraj', branches: 2, staff: 10 },
  { name: 'Kailash Parbat', branches: 5, staff: 50 },
];

export default function AdminDashboardPage() {
  const { role, isMounted } = useRole();
  const router = useRouter();

  useEffect(() => {
    if (isMounted && role !== 'admin') {
      router.push('/login');
    }
  }, [role, isMounted, router]);

  if (!isMounted || role !== 'admin') {
    return <div>Loading...</div>; // Or a proper loader
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold md:text-3xl font-headline">Admin Dashboard</h1>
      </div>
      
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Restaurants</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{restaurants.length}</div>
            <p className="text-xs text-muted-foreground">managed on the platform</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Branches</CardTitle>
            <GitBranch className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{restaurants.reduce((acc, r) => acc + r.branches, 0)}</div>
             <p className="text-xs text-muted-foreground">across all restaurants</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Staff</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{restaurants.reduce((acc, r) => acc + r.staff, 0)}</div>
             <p className="text-xs text-muted-foreground">across all restaurants</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Registered Restaurants</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Restaurant Name</TableHead>
                <TableHead className="text-center">Total Branches</TableHead>
                <TableHead className="text-center">Total Staff</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {restaurants.map((resto) => (
                <TableRow key={resto.name}>
                  <TableCell className="font-medium">{resto.name}</TableCell>
                  <TableCell className="text-center">{resto.branches}</TableCell>
                  <TableCell className="text-center">{resto.staff}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm">View Data</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
