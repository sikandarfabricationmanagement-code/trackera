'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useRole } from '@/hooks/use-role';
import { useRouter } from 'next/navigation';
import { Logo } from '@/components/logo';
import { useFirestore } from '@/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { setDocumentNonBlocking } from '@/firebase';

const AdminLoginTab = () => {
  const { setRole } = useRole();
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get('email');

    if (email === 'admin@gmail.com') {
      setRole('admin');
      router.push('/admin-dashboard');
    } else {
      alert('Invalid admin credentials.');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="admin-email">Admin Email</Label>
          <Input id="admin-email" name="email" type="email" placeholder="admin@gmail.com" required />
        </div>
        <Button type="submit" className="w-full">Login as Admin</Button>
      </CardContent>
    </form>
  );
};

const ManagerLoginTab = () => {
    const { setRole } = useRole();
    const router = useRouter();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, you'd verify credentials.
        // For now, we'll just set the role and redirect.
        const formData = new FormData(e.target as HTMLFormElement);
        const restaurantName = formData.get('restaurant-name') as string;
        const managerEmail = formData.get('manager-email') as string;

        if (restaurantName && managerEmail) {
            setRole('manager', { restaurantName, managerEmail });
            router.push(`/manager-dashboard/${restaurantName}`);
        } else {
            alert('Please select a restaurant and enter your email.');
        }
    }

    return (
        <form onSubmit={handleLogin}>
            <CardContent className="space-y-4">
                 <div className="space-y-2">
                    <Label htmlFor="restaurant-name">Restaurant</Label>
                    <Select name="restaurant-name">
                        <SelectTrigger id="restaurant-name">
                            <SelectValue placeholder="Select your restaurant" />
                        </SelectTrigger>
                        <SelectContent>
                            {/* This will be populated from Firestore */}
                            <SelectItem value="Shivraj">Shivraj</SelectItem>
                            <SelectItem value="Kailash Parbat">Kailash Parbat</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="manager-email">Manager Email</Label>
                    <Input id="manager-email" name="manager-email" type="email" placeholder="manager@example.com" required />
                </div>
                <Button type="submit" className="w-full">Login as Manager</Button>
            </CardContent>
        </form>
    );
};

const ManagerRegisterTab = () => {
    const { setRole } = useRole();
    const router = useRouter();
    const firestore = useFirestore();

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const restaurantName = formData.get('restaurant-name') as string;
        const managerEmail = formData.get('manager-email') as string;
        const branchesCount = 9; // Hardcoded to 9 as requested

        if (!restaurantName || !managerEmail || !firestore) {
            alert('An error occurred. Please try again.');
            return;
        }

        // Create main restaurant document
        const restaurantDocRef = doc(firestore, 'restaurants', restaurantName);
        setDocumentNonBlocking(restaurantDocRef, {
            managerEmail,
            branchesCount,
        }, { merge: true });

        // Create branch subcollections
        for (let i = 1; i <= branchesCount; i++) {
            const branchDocRef = doc(firestore, `restaurants/${restaurantName}/branches`, `${i}`);
            setDocumentNonBlocking(branchDocRef, {
                staffCount: 0,
            }, { merge: true });
        }

        // Set role and redirect
        setRole('manager', { restaurantName, managerEmail });
        router.push(`/manager-dashboard/${restaurantName}`);
    }

    return (
         <form onSubmit={handleRegister}>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="reg-restaurant-name">Restaurant Name</Label>
                    <Input id="reg-restaurant-name" name="restaurant-name" type="text" placeholder="e.g., The Golden Spoon" required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="reg-manager-email">Manager Email</Label>
                    <Input id="reg-manager-email" name="manager-email" type="email" placeholder="your-email@example.com" required />
                </div>
                <Button type="submit" className="w-full">Register and Login</Button>
            </CardContent>
        </form>
    );
}

const StaffLoginTab = () => {
    const { setRole } = useRole();
    const router = useRouter();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const restaurantName = formData.get('restaurant-name') as string;
        const branchId = formData.get('branch-id') as string;
        const staffId = formData.get('staff-id') as string;

        if (restaurantName && branchId && staffId) {
            setRole('staff', { restaurantName, branchId, staffId });
            router.push(`/staff-dashboard/${restaurantName}/${branchId}/${staffId}`);
        } else {
            alert('Please fill in all fields.');
        }
    }

    return (
        <form onSubmit={handleLogin}>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="staff-restaurant-name">Restaurant</Label>
                    <Select name="restaurant-name">
                        <SelectTrigger id="staff-restaurant-name">
                            <SelectValue placeholder="Select restaurant" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Shivraj">Shivraj</SelectItem>
                            <SelectItem value="Kailash Parbat">Kailash Parbat</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="staff-branch-id">Branch</Label>
                     <Select name="branch-id">
                        <SelectTrigger id="staff-branch-id">
                            <SelectValue placeholder="Select branch" />
                        </SelectTrigger>
                        <SelectContent>
                            {[...Array(9)].map((_, i) => (
                                <SelectItem key={i + 1} value={`${i + 1}`}>Branch #{i + 1}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="staff-id">Staff ID</Label>
                    <Input id="staff-id" name="staff-id" type="text" placeholder="e.g., shivraj11" required />
                </div>
                <Button type="submit" className="w-full">Login as Staff</Button>
            </CardContent>
        </form>
    );
};

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/40 p-4">
      <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
       <div className="mb-8 flex flex-col items-center text-center gap-2 text-primary">
        <a href="/" className="flex items-center gap-4">
          <Logo className="h-12 w-12" />
          <h1 className="font-headline text-5xl font-bold tracking-tighter">Trackera</h1>
        </a>
        <p className="text-sm text-muted-foreground">Smart Restaurant Management powered by Optineura Technology</p>
      </div>

      <Tabs defaultValue="manager" className="w-full max-w-md">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="admin">Admin</TabsTrigger>
          <TabsTrigger value="manager">Manager</TabsTrigger>
          <TabsTrigger value="staff">Staff</TabsTrigger>
        </TabsList>
        <TabsContent value="admin">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Admin Login</CardTitle>
              <CardDescription>Enter admin credentials to access the dashboard.</CardDescription>
            </CardHeader>
            <AdminLoginTab />
          </Card>
        </TabsContent>
        <TabsContent value="manager">
            <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="login">Login</TabsTrigger>
                    <TabsTrigger value="register">Register</TabsTrigger>
                </TabsList>
                <TabsContent value="login">
                    <Card>
                        <CardHeader>
                            <CardTitle className="font-headline">Manager Login</CardTitle>
                            <CardDescription>Select your restaurant to log in.</CardDescription>
                        </CardHeader>
                        <ManagerLoginTab />
                    </Card>
                </TabsContent>
                 <TabsContent value="register">
                    <Card>
                        <CardHeader>
                            <CardTitle className="font-headline">Register Restaurant</CardTitle>
                            <CardDescription>Create a new restaurant account.</CardDescription>
                        </CardHeader>
                        <ManagerRegisterTab />
                    </Card>
                </TabsContent>
            </Tabs>
        </TabsContent>
        <TabsContent value="staff">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Staff Login</CardTitle>
              <CardDescription>Enter your details to access your dashboard.</CardDescription>
            </CardHeader>
            <StaffLoginTab />
          </Card>
        </TabsContent>
      </Tabs>
      <footer className="mt-8 text-center text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} Optineura Technology. All rights reserved.
      </footer>
    </div>
  );
}
