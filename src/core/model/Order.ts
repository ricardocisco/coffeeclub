export type User = {
  id: string;
  name: string;
  email: string;
};

export type Coffee = {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  createdAt: string;
};

export type OrderItem = {
  id?: string;
  coffeeId: string;
  orderId?: string;
  coffee?: Coffee;
  quantity?: number;
};

export type Order = {
  id?: string;
  userId?: string;
  createdAt?: string;
  items: OrderItem[];
  status?: string;
  total: number;
  user?: User;
};

export type Status = {
  PENDENTE: string;
  ENVIADO: string;
  ENTREGUE: string;
  CANCELADO: string;
};
