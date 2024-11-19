import { Role as PrismaRole, Status as PrismaStatus } from "@prisma/client";

export type Role = PrismaRole;

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  password: string;
  Order?: Order[];
}

export interface Coffee {
  id: string;
  name: string;
  price: number;
  stock: number;
  description?: string;
  imageUrl: string;
  additions?: Addition[];
  createdAt: Date;
  orderItem?: OrderItem[];
  quantity: number;
}

export interface Addition {
  id: string;
  name: string;
  price: number;
  createdAt: Date;
  coffeeId: string;
  coffee?: Coffee;
  orderItemId?: string;
  orderItem?: OrderItem;
}

export interface Order {
  id: string;
  userId: string;
  user?: User;
  items: OrderItem[];
  total: number;
  createdAt: Date;
  status: PrismaStatus;
}

export interface OrderItem {
  id: string;
  coffeeId: string;
  coffee?: Coffee;
  additions?: Addition[];
  orderId: string;
  order?: Order;
  createdAt: Date;
  quantity: number;
}
