'use client';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import type { Order, Table, MenuItem } from '@/lib/types';
import { menuItems } from '@/lib/data';
import { Utensils } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';

interface ManageOrderDialogProps {
  table: Table | null;
  onOrderUpdate: (tableId: string, updatedOrder: Order) => void;
}

const menuCategories = Array.from(new Set(menuItems.map(item => item.category)));


export function ManageOrderDialog({ table: initialTable, onOrderUpdate }: ManageOrderDialogProps) {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
  const [newMenuItemId, setNewMenuItemId] = useState('');
  
  useEffect(() => {
    if (initialTable?.currentOrder) {
      setCurrentOrder(JSON.parse(JSON.stringify(initialTable.currentOrder)));
    } else {
        setCurrentOrder(null);
    }
  }, [initialTable, open]);


  if (!initialTable || !currentOrder) {
    return (
        <Button variant="outline" className="w-full" disabled>
            <Utensils className="mr-2 h-4 w-4" />
            Manage Order
      </Button>
    )
  }
  
  const handleStatusChange = (newStatus: Order['status']) => {
    setCurrentOrder(prev => prev ? {...prev, status: newStatus} : null);
  };

  const handleAddItem = () => {
    if (!newMenuItemId) return;

    const itemToAdd = menuItems.find(item => item.id === newMenuItemId);
    if (!itemToAdd) return;

    setCurrentOrder(prev => {
        if (!prev) return null;
        const existingItem = prev.items.find(item => item.id === newMenuItemId);
        let newItems;
        if (existingItem) {
            newItems = prev.items.map(item => item.id === newMenuItemId ? {...item, quantity: item.quantity + 1} : item);
        } else {
            newItems = [...prev.items, {...itemToAdd, quantity: 1}];
        }
        const newTotal = newItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
        return {...prev, items: newItems, total: newTotal};
    });
    setNewMenuItemId('');
  }

  const handleSave = () => {
    if (currentOrder && initialTable) {
        onOrderUpdate(initialTable.id, currentOrder);
        toast({
            title: "Order Updated",
            description: `Order ${currentOrder.id} has been successfully updated.`,
        });
        setOpen(false);
    }
  }


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
            <Utensils className="mr-2 h-4 w-4" />
            Manage Order
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle className="font-headline">Manage Order #{currentOrder.id}</DialogTitle>
          <DialogDescription>View, edit, and update the order status.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
            <div>
                <h4 className="font-medium text-lg mb-2">Current Items</h4>
                <ul className="space-y-2 text-sm">
                    {currentOrder.items.map(item => (
                         <li key={item.id} className="flex justify-between items-center">
                            <span>{item.name} x {item.quantity}</span>
                            <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                        </li>
                    ))}
                </ul>
                <Separator className="my-4" />
                 <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>₹{currentOrder.total.toFixed(2)}</span>
                </div>
            </div>

            <Separator />

            <div className="grid gap-2">
                 <Label htmlFor="status">Order Status</Label>
                <Select value={currentOrder.status} onValueChange={handleStatusChange}>
                    <SelectTrigger id="status">
                        <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Pending">Pending</SelectItem>
                        <SelectItem value="Preparing">Preparing</SelectItem>
                        <SelectItem value="Served">Served</SelectItem>
                        <SelectItem value="Paid">Paid</SelectItem>
                    </SelectContent>
                </Select>
            </div>
             <div className="grid gap-2">
                <Label htmlFor="add-item">Add Item</Label>
                <div className="flex gap-2">
                     <Select value={newMenuItemId} onValueChange={setNewMenuItemId}>
                        <SelectTrigger id="add-item">
                            <SelectValue placeholder="Select an item to add" />
                        </SelectTrigger>
                        <SelectContent>
                            {menuCategories.map(category => (
                                <SelectGroup key={category}>
                                    <SelectLabel>{category}</SelectLabel>
                                    {menuItems.filter(item => item.category === category).map(item => (
                                        <SelectItem key={item.id} value={item.id}>{item.name} - ₹{item.price.toFixed(2)}</SelectItem>
                                    ))}
                                </SelectGroup>
                            ))}
                        </SelectContent>
                    </Select>
                    <Button onClick={handleAddItem}>Add</Button>
                </div>
            </div>
        </div>
        <DialogFooter>
            <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
