import { Order } from "@/core/model/User";
import db from "@/lib/db";

export async function getOrderItemsById(orderId: string) {
  return await db.orderItem.findMany({
    where: {
      orderId,
    },
    include: {
      coffee: true,
    },
  });
}

export async function getOrderById(id: string) {
  return await db.order.findUnique({
    where: {
      id,
    },
    include: {
      items: {
        include: {
          coffee: true,
        },
      },
      user: true,
    },
  });
}

export async function getAllOrders() {
  return await db.order.findMany({
    include: {
      items: true,
      user: true,
    },
  });
}

export async function createOrder(data: Order) {
  return await db.order.create({
    data: {
      userId: data.userId,
      total: data.total,
      status: "PENDENTE",
      items: {
        create:
          data.items?.map((item) => ({
            coffeeId: item.coffeeId,
          })) ?? [],
      },
      createdAt: new Date(),
    },
  });
}
