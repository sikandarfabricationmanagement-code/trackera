'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useRole } from '@/hooks/use-role';
import { LogOut, Settings, User } from 'lucide-react';

const getDisplayName = (identity: any) => {
    switch (identity.role) {
        case 'admin':
            return 'Admin';
        case 'manager':
            return identity.restaurantName || 'Manager';
        case 'staff':
            return identity.staffId || 'Staff';
        default:
            return 'User';
    }
}

const getDisplayEmail = (identity: any) => {
     switch (identity.role) {
        case 'admin':
            return 'admin@trackera.com';
        case 'manager':
            return identity.managerEmail || 'manager@trackera.com';
        case 'staff':
            return `${identity.staffId}@trackera.com`;
        default:
            return 'user@trackera.com';
    }
}


export function UserNav() {
  const { logout, identity } = useRole();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-9 w-9">
            <AvatarImage src="https://picsum.photos/seed/user-nav/100/100" alt="User Avatar" data-ai-hint="person avatar" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {getDisplayName(identity)}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {getDisplayEmail(identity)}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
