import type { Restaurant, User, Table, Order } from './types';
import { PlaceHolderImages } from './placeholder-images';

export const users: User[] = [
  { id: 'u1', name: 'User 1', email: 'user.1@example.com', role: 'Manager', branch: 'Downtown', avatarUrl: PlaceHolderImages.find(p => p.id === 'user-avatar-1')?.imageUrl || '', status: 'Active' },
  { id: 'u2', name: 'User 2', email: 'user.2@example.com', role: 'Cashier', branch: 'Downtown', avatarUrl: PlaceHolderImages.find(p => p.id === 'user-avatar-2')?.imageUrl || '', status: 'Active' },
  { id: 'u3', name: 'User 3', email: 'user.3@example.com', role: 'Waiter', branch: 'Downtown', avatarUrl: PlaceHolderImages.find(p => p.id === 'user-avatar-3')?.imageUrl || '', status: 'Active' },
  { id: 'u4', name: 'User 4', email: 'user.4@example.com', role: 'Kitchen Staff', branch: 'Downtown', avatarUrl: PlaceHolderImages.find(p => p.id === 'user-avatar-4')?.imageUrl || '', status: 'Active' },
  { id: 'u5', name: 'User 5', email: 'user.5@example.com', role: 'Manager', branch: 'Uptown', avatarUrl: PlaceHolderImages.find(p => p.id === 'user-avatar-5')?.imageUrl || '', status: 'Inactive' },
  { id: 'u6', name: 'User 6', email: 'user.6@example.com', role: 'Waiter', branch: 'Uptown', avatarUrl: PlaceHolderImages.find(p => p.id === 'user-avatar-6')?.imageUrl || '', status: 'Active' },
  { id: 'u7', name: 'User 7', email: 'user.7@example.com', role: 'Kitchen Staff', branch: 'Uptown', avatarUrl: PlaceHolderImages.find(p => p.id === 'user-avatar-7')?.imageUrl || '', status: 'Active' },
  { id: 'u8', name: 'User 8', email: 'user.8@example.com', role: 'Cashier', branch: 'Uptown', avatarUrl: PlaceHolderImages.find(p => p.id === 'user-avatar-8')?.imageUrl || '', status: 'Active' },
  { id: 'u9', name: 'User 9', email: 'user.9@example.com', role: 'Waiter', branch: 'Midtown', avatarUrl: PlaceHolderImages.find(p => p.id === 'user-avatar-9')?.imageUrl || '', status: 'Active' },
  { id: 'u10', name: 'User 10', email: 'user.10@example.com', role: 'Manager', branch: 'Midtown', avatarUrl: PlaceHolderImages.find(p => p.id === 'user-avatar-10')?.imageUrl || '', status: 'Active' },
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
    items: [{id: 'm1', name: 'Butter Chicken', price: 15.00, quantity: 1}, {id: 'm2', name: 'Garlic Naan', price: 4.00, quantity: 2}],
    total: 23.00,
    status: 'Preparing',
    timestamp: new Date()
}

const sampleOrder2: Order = {
    id: 'o2',
    items: [{id: 'm3', name: 'Palak Paneer', price: 13.00, quantity: 1}, {id: 'm4', name: 'Mango Lassi', price: 5.00, quantity: 2}],
    total: 23.00,
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
  { name: 'Butter Chicken', sold: 120 },
  { name: 'Samosa', sold: 210 },
  { name: 'Paneer Tikka', sold: 95 },
  { name: 'Biryani', sold: 80 },
  { name: 'Mango Lassi', sold: 150 },
];
