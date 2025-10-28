export type UserRole = 'Manager' | 'Cashier' | 'Waiter' | 'Kitchen Staff';

export type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  branch: string;
  avatarUrl: string;
  status: 'Active' | 'Inactive';
};

export type Branch = {
  id: string;
  name: string;
  location: string;
  managerId: string;
  status: 'Active' | 'Inactive';
};

export type Restaurant = {
  id: string;
  name: string;
  cuisine: string;
  branches: Branch[];
};

export type MenuItem = {
  id: string;
  name: string;
  price: number;
  category: 'Starters' | 'Main Course' | 'Desserts' | 'Drinks';
  type: 'Veg' | 'Non-Veg';
};

export type OrderItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

export type Order = {
  id: string;
  items: OrderItem[];
  total: number;
  status: 'Pending' | 'Preparing' | 'Served' | 'Paid';
  timestamp: Date;
};

export type Table = {
  id: string;
  capacity: number;
  status: 'Available' | 'Occupied' | 'Reserved';
  currentOrder: Order | null;
};
