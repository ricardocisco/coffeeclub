export type Coffee = {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  createdAt: string;
};

export type OrderItem = {
  id: string;
  coffeeId: string;
  orderId: string;
  coffee: Coffee;
};

export type Order = {
  id: string;
  createdAt: string;
  orderItems: OrderItem[];
  status: string;
  total: number;
};

export type Status = {
  PENDENTE: string;
  ENVIADO: string;
  ENTREGUE: string;
  CANCELADO: string;
};
