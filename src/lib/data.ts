import type { Restaurant, User, Table, Order } from './types';
import { PlaceHolderImages } from './placeholder-images';

export const users: User[] = [
  { id: 'u1', name: 'Alice Johnson', email: 'alice.j@example.com', role: 'Manager', branch: 'Downtown', avatarUrl: PlaceHolderImages.find(p => p.id === 'user-avatar-1')?.imageUrl || '', status: 'Active' },
  { id: 'u2', name: 'Bob Williams', email: 'bob.w@example.com', role: 'Cashier', branch: 'Downtown', avatarUrl: PlaceHolderImages.find(p => p.id === 'user-avatar-2')?.imageUrl || '', status: 'Active' },
  { id: 'u3', name: 'Charlie Brown', email: 'charlie.b@example.com', role: 'Waiter', branch: 'Downtown', avatarUrl: PlaceHolderImages.find(p => p.id === 'user-avatar-3')?.imageUrl || '', status: 'Active' },
  { id: 'u4', name: 'Diana Prince', email: 'diana.p@example.com', role: 'Kitchen Staff', branch: 'Downtown', avatarUrl: PlaceHolderImages.find(p => p.id === 'user-avatar-4')?.imageUrl || '', status: 'Active' },
  { id: 'u5', name: 'Ethan Hunt', email: 'ethan.h@example.com', role: 'Manager', branch: 'Uptown', avatarUrl: PlaceHolderImages.find(p => p.id === 'user-avatar-5')?.imageUrl || '', status: 'Inactive' },
  { id: 'u6', name: 'Fiona Glenanne', email: 'fiona.g@example.com', role: 'Waiter', branch: 'Uptown', avatarUrl: PlaceHolderImages.find(p => p.id === 'user-avatar-6')?.imageUrl || '', status: 'Active' },
  { id: 'u7', name: 'George Costanza', email: 'george.c@example.com', role: 'Kitchen Staff', branch: 'Uptown', avatarUrl: PlaceHolderImages.find(p => p.id === 'user-avatar-7')?.imageUrl || '', status: 'Active' },
  { id: 'u8', name: 'Hannah Abbott', email: 'hannah.a@example.com', role: 'Cashier', branch: 'Uptown', avatarUrl: PlaceHolderImages.find(p => p.id === 'user-avatar-8')?.imageUrl || '', status: 'Active' },
  { id: 'u9', name: 'Ian Malcolm', email: 'ian.m@example.com', role: 'Waiter', branch: 'Midtown', avatarUrl: PlaceHolderImages.find(p => p.id === 'user-avatar-9')?.imageUrl || '', status: 'Active' },
  { id: 'u10', name: 'Jane Smith', email: 'jane.s@example.com', role: 'Manager', branch: 'Midtown', avatarUrl: PlaceHolderImages.find(p => p.id === 'user-avatar-10')?.imageUrl || '', status: 'Active' },
];

export const restaurants: Restaurant[] = [
  {
    id: 'r1',
    name: 'The Golden Spoon',
    cuisine: 'Italian',
    branches: [
      { id: 'b1', name: 'Downtown', location: '123 Main St', managerId: 'u1', status: 'Active' },
      { id: 'b2', name: 'Uptown', location: '456 High St', managerId: 'u5', status: 'Active' },
      { id: 'b3', name: 'Midtown', location: '789 Central Ave', managerId: 'u10', status: 'Inactive' },
    ],
  },
  {
    id: 'r2',
    name: 'Le Cordon Bleu',
    cuisine: 'French',
    branches: [
      { id: 'b4', name: 'SoHo', location: '101 Prince St', managerId: 'u1', status: 'Active' },
    ],
  },
];

const sampleOrder1: Order = {
    id: 'o1',
    items: [{id: 'm1', name: 'Margherita Pizza', price: 12.50, quantity: 1}, {id: 'm2', name: 'Coke', price: 2.50, quantity: 2}],
    total: 17.50,
    status: 'Preparing',
    timestamp: new Date()
}

const sampleOrder2: Order = {
    id: 'o2',
    items: [{id: 'm3', name: 'Caesar Salad', price: 9.00, quantity: 2}, {id: 'm4', name: 'Iced Tea', price: 3.00, quantity: 2}],
    total: 24.00,
    status: 'Served',
    timestamp: new Date()
}

export const tables: Table[] = [
  { id: 'T1', capacity: 4, status: 'Occupied', currentOrder: sampleOrder1 },
  { id: 'T2', capacity: 2, status: 'Available', currentOrder: null },
  { id: 'T3', capacity: 6, status: 'Occupied', currentOrder: sampleOrder2 },
  { id: 'T4', capacity: 4, status: 'Reserved', currentOrder: null },
  { id: 'T5', capacity: 2, status: 'Available', currentOrder: null },
  { id: 'T6', capacity: 8, status: 'Available', currentOrder: null },
  { id: 'T7', capacity: 4, status: 'Occupied', currentOrder: {...sampleOrder1, id: 'o3'} },
  { id: 'T8', capacity: 2, status: 'Available', currentOrder: null },
];


export const salesData = [
  { name: 'Jan', total: Math.floor(Math.random() * 5000) + 1000 },
  { name: 'Feb', total: Math.floor(Math.random() * 5000) + 1000 },
  { name: 'Mar', total: Math.floor(Math.random() * 5000) + 1000 },
  { name: 'Apr', total: Math.floor(Math.random() * 5000) + 1000 },
  { name: 'May', total: Math.floor(Math.random() * 5000) + 1000 },
  { name: 'Jun', total: Math.floor(Math.random() * 5000) + 1000 },
  { name: 'Jul', total: Math.floor(Math.random() * 5000) + 1000 },
  { name: 'Aug', total: Math.floor(Math.random() * 5000) + 1000 },
  { name: 'Sep', total: Math.floor(Math.random() * 5000) + 1000 },
  { name: 'Oct', total: Math.floor(Math.random() * 5000) + 1000 },
  { name: 'Nov', total: Math.floor(Math.random() * 5000) + 1000 },
  { name: 'Dec', total: Math.floor(Math.random() * 5000) + 1000 },
];

export const topItemsData = [
  { name: 'Margherita Pizza', sold: 120 },
  { name: 'Caesar Salad', sold: 98 },
  { name: 'Classic Burger', sold: 85 },
  { name: 'Pasta Carbonara', sold: 70 },
  { name: 'Coke', sold: 250 },
];
