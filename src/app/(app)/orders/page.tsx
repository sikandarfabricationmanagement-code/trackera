'use client';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { tables as initialTables } from '@/lib/data';
import type { Table, OrderItem, Order } from '@/lib/types';
import { Armchair, Clock } from 'lucide-react';
import { AIRecommender } from './ai-recommender';
import { ManageOrderDialog } from './manage-order-dialog';

const getStatusColor = (status: Table['status']) => {
  switch (status) {
    case 'Available':
      return 'bg-green-500/20 text-green-700';
    case 'Occupied':
      return 'bg-yellow-500/20 text-yellow-700';
    case 'Reserved':
      return 'bg-blue-500/20 text-blue-700';
    default:
      return 'bg-gray-500/20 text-gray-700';
  }
};

const TableCard = ({ table, onOrderUpdate }: { table: Table; onOrderUpdate: (tableId: string, updatedOrder: Order) => void; }) => (
  <Card className="flex flex-col">
    <CardHeader className="flex-row items-center justify-between pb-2">
      <CardTitle className="text-lg font-bold font-headline">{table.id}</CardTitle>
      <Badge className={getStatusColor(table.status)}>{table.status}</Badge>
    </CardHeader>
    <CardContent className="flex-grow">
      <div className="flex items-center text-sm text-muted-foreground mb-4">
        <Armchair className="mr-2 h-4 w-4" />
        <span>{table.capacity} Seats</span>
      </div>
      {table.status === 'Occupied' && table.currentOrder && (
        <div>
          <h4 className="font-semibold mb-2">Current Order</h4>
          <ul className="space-y-1 text-sm">
            {table.currentOrder.items.map((item: OrderItem) => (
              <li key={item.id} className="flex justify-between">
                <span>{item.name} x{item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
           <div className="flex items-center text-sm text-muted-foreground mt-2">
            <Clock className="mr-2 h-4 w-4" />
            <span>Order status: {table.currentOrder.status}</span>
          </div>
        </div>
      )}
    </CardContent>
    <CardFooter className="flex gap-2">
      <ManageOrderDialog table={table} onOrderUpdate={onOrderUpdate} />
      <AIRecommender orderHistory={table.currentOrder?.items || []} />
    </CardFooter>
  </Card>
);

export default function OrdersPage() {
  const [tables, setTables] = useState<Table[]>(initialTables);

  const handleOrderUpdate = (tableId: string, updatedOrder: Order) => {
    setTables(prevTables => 
        prevTables.map(table => 
            table.id === tableId ? { ...table, currentOrder: updatedOrder } : table
        )
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl font-headline">Order Management</h1>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {tables.map(table => (
          <TableCard key={table.id} table={table} onOrderUpdate={handleOrderUpdate} />
        ))}
      </div>
    </div>
  );
}
