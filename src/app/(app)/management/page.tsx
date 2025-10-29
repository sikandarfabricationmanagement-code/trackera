'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { restaurants, users, menuItems as initialMenuItems } from '@/lib/data';
import type { Restaurant, Branch, User, MenuItem } from '@/lib/types';
import { MoreHorizontal, PlusCircle } from 'lucide-react';
import { useRole } from '@/hooks/use-role';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const allBranches: Branch[] = restaurants.flatMap(r => r.branches);

const RestaurantsTab = () => (
  <Card>
    <CardHeader className="flex flex-row items-center">
      <div className="grid gap-2">
        <CardTitle className="font-headline">Restaurants</CardTitle>
        <CardDescription>Manage your restaurant chains.</CardDescription>
      </div>
      <Button asChild size="sm" className="ml-auto gap-1">
          <a href="#">
            <PlusCircle className="h-4 w-4" />
            Add Restaurant
          </a>
      </Button>
    </CardHeader>
    <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Cuisine</TableHead>
            <TableHead>Branches</TableHead>
            <TableHead><span className="sr-only">Actions</span></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {restaurants.map((restaurant: Restaurant) => (
            <TableRow key={restaurant.id}>
              <TableCell className="font-medium">{restaurant.name}</TableCell>
              <TableCell>{restaurant.cuisine}</TableCell>
              <TableCell>{restaurant.branches.length}</TableCell>
              <TableCell>
                  <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                          <Button aria-haspopup="true" size="icon" variant="ghost">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Toggle menu</span>
                          </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                  </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CardContent>
  </Card>
);

const BranchesTab = () => (
  <Card>
    <CardHeader className="flex flex-row items-center">
      <div className="grid gap-2">
        <CardTitle className="font-headline">Branches</CardTitle>
        <CardDescription>Manage all restaurant branches.</CardDescription>
      </div>
       <Button asChild size="sm" className="ml-auto gap-1">
          <a href="#">
            <PlusCircle className="h-4 w-4" />
            Add Branch
          </a>
      </Button>
    </CardHeader>
    <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Branch Name</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Status</TableHead>
             <TableHead><span className="sr-only">Actions</span></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allBranches.map((branch: Branch) => (
            <TableRow key={branch.id}>
              <TableCell className="font-medium">{branch.name}</TableCell>
              <TableCell>{branch.location}</TableCell>
              <TableCell>
                <Badge variant={branch.status === 'Active' ? 'default' : 'secondary'} className={branch.status === 'Active' ? 'bg-green-500/20 text-green-700' : ''}>{branch.status}</Badge>
              </TableCell>
               <TableCell>
                  <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                          <Button aria-haspopup="true" size="icon" variant="ghost">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Toggle menu</span>
                          </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>Deactivate</DropdownMenuItem>
                      </DropdownMenuContent>
                  </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CardContent>
  </Card>
);

const UsersTab = () => (
    <Card>
    <CardHeader className="flex flex-row items-center">
      <div className="grid gap-2">
        <CardTitle className="font-headline">Users</CardTitle>
        <CardDescription>Manage all staff members.</CardDescription>
      </div>
      <Button asChild size="sm" className="ml-auto gap-1">
          <a href="#">
            <PlusCircle className="h-4 w-4" />
            Add User
          </a>
      </Button>
    </CardHeader>
    <CardContent>
        <Table>
            <TableHeader>
                <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Branch</TableHead>
                <TableHead>Status</TableHead>
                <TableHead><span className="sr-only">Actions</span></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {users.map((user: User) => (
                    <TableRow key={user.id}>
                        <TableCell className="font-medium">
                            <div className="flex items-center gap-3">
                                <Avatar className="hidden h-9 w-9 sm:flex">
                                    <AvatarImage src={user.avatarUrl} alt="Avatar" data-ai-hint="person portrait" />
                                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div className="grid gap-0.5">
                                    <p className="font-medium">{user.name}</p>
                                    <p className="text-xs text-muted-foreground">{user.email}</p>
                                </div>
                            </div>
                        </TableCell>
                        <TableCell>{user.role}</TableCell>
                        <TableCell>{user.branch}</TableCell>
                        <TableCell>
                            <Badge variant={user.status === 'Active' ? 'default' : 'secondary'} className={user.status === 'Active' ? 'bg-green-500/20 text-green-700' : ''}>
                                {user.status}
                            </Badge>
                        </TableCell>
                         <TableCell>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button aria-haspopup="true" size="icon" variant="ghost">
                                        <MoreHorizontal className="h-4 w-4" />
                                        <span className="sr-only">Toggle menu</span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                    <DropdownMenuItem>Edit</DropdownMenuItem>
                                    <DropdownMenuItem>Deactivate</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </CardContent>
  </Card>
);

const MenuTab = () => {
    const [menuItems, setMenuItems] = useState<MenuItem[]>(initialMenuItems);

    const handleAvailabilityChange = (itemId: string, checked: boolean) => {
        setMenuItems(prevItems => 
            prevItems.map(item => 
                item.id === itemId ? { ...item, isAvailable: checked } : item
            )
        );
    };
    
    return (
        <Card>
        <CardHeader className="flex flex-row items-center">
            <div className="grid gap-2">
            <CardTitle className="font-headline">Menu Items</CardTitle>
            <CardDescription>Manage your restaurant's menu.</CardDescription>
            </div>
            <Button asChild size="sm" className="ml-auto gap-1">
            <a href="#">
                <PlusCircle className="h-4 w-4" />
                Add Menu Item
            </a>
            </Button>
        </CardHeader>
        <CardContent>
            <Table>
            <TableHeader>
                <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Availability</TableHead>
                <TableHead><span className="sr-only">Actions</span></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {menuItems.map((item: MenuItem) => (
                <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell><Badge variant={item.type === 'Veg' ? 'default' : 'destructive'} className={item.type === 'Veg' ? 'bg-green-500/20 text-green-700 border-green-500/20' : 'bg-red-500/20 text-red-700 border-red-500/20'}>{item.type}</Badge></TableCell>
                    <TableCell>₹{item.price.toFixed(2)}</TableCell>
                    <TableCell>
                        <div className="flex items-center space-x-2">
                            <Switch
                                id={`available-${item.id}`}
                                checked={item.isAvailable}
                                onCheckedChange={(checked) => handleAvailabilityChange(item.id, checked)}
                            />
                            <Label htmlFor={`available-${item.id}`} className={item.isAvailable ? 'text-green-700' : 'text-red-700'}>
                                {item.isAvailable ? 'Available' : 'Unavailable'}
                            </Label>
                        </div>
                    </TableCell>
                    <TableCell>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                        <Button aria-haspopup="true" size="icon" variant="ghost">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                        </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    </TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
        </CardContent>
        </Card>
    );
}


export default function ManagementPage() {
    const { role, isMounted } = useRole();
    const router = useRouter();

    useEffect(() => {
        if (isMounted && role === 'staff') {
        router.push('/dashboard');
        }
    }, [role, isMounted, router]);

    if (!isMounted || (role !== 'manager' && role !== 'super-admin')) {
        return (
            <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
                <div className="flex flex-col items-center gap-1 text-center">
                    <h3 className="text-2xl font-bold tracking-tight">Loading...</h3>
                </div>
            </div>
        );
    }
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl font-headline">Management</h1>
      </div>
      <Tabs defaultValue="restaurants">
        <TabsList>
          <TabsTrigger value="restaurants">Restaurants</TabsTrigger>
          <TabsTrigger value="branches">Branches</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="menu">Menu</TabsTrigger>
        </TabsList>
        <TabsContent value="restaurants">
          <RestaurantsTab />
        </TabsContent>
        <TabsContent value="branches">
          <BranchesTab />
        </TabsContent>
        <TabsContent value="users">
          <UsersTab />
        </TabsContent>
        <TabsContent value="menu">
          <MenuTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
