'use client';
import { useRole } from '@/hooks/use-role';
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, Users } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

// Mock Data
const branches = [{ id: 1, staffCount: 5 }, { id: 2, staffCount: 8 }];
const staff = [
    { id: 'shivraj11', branch: 1, role: 'Waiter'},
    { id: 'shivraj12', branch: 1, role: 'Cashier'},
    { id: 'shivraj21', branch: 2, role: 'Waiter'},
];

export default function ManagerDashboardPage() {
  const { role, identity, isMounted } = useRole();
  const router = useRouter();
  const params = useParams();
  const restaurantName = params.restaurantName as string;

  useEffect(() => {
    if (isMounted && (role !== 'manager' || identity?.restaurantName !== restaurantName)) {
      router.push('/login');
    }
  }, [role, isMounted, router, identity, restaurantName]);

  if (!isMounted || role !== 'manager') {
    return <div>Loading...</div>;
  }

  const handleAddNewStaff = () => {
    // Logic to add new staff will go here
    alert('Adding new staff...');
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold md:text-3xl font-headline">
          Manager Dashboard: <span className="text-primary">{restaurantName}</span>
        </h1>
        <Button onClick={handleAddNewStaff}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add New Staff
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Branches</CardTitle>
            <CardDescription>Overview of your restaurant's branches.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Branch Number</TableHead>
                        <TableHead className="text-right">Staff Count</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {branches.map(branch => (
                        <TableRow key={branch.id}>
                            <TableCell>Branch #{branch.id}</TableCell>
                            <TableCell className="text-right">{branch.staffCount}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">Staff List</CardTitle>
                <CardDescription>All staff across all branches.</CardDescription>
            </CardHeader>
            <CardContent>
                 <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Staff ID</TableHead>
                            <TableHead>Branch</TableHead>
                            <TableHead>Role</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {staff.map(member => (
                            <TableRow key={member.id}>
                                <TableCell className="font-mono">{member.id}</TableCell>
                                <TableCell>Branch #{member.branch}</TableCell>
                                <TableCell>{member.role}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
