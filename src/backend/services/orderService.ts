import { Order } from "@/core/model/User";
import db from "@/lib/db";
import { Status } from "@prisma/client";

export async function getOrderItemsById(orderId: string) {
  if (!orderId) {
    throw new Error("ID nao informado");
  }

  return await db.orderItem.findMany({
    where: {
      orderId,
    },
    include: {
      coffee: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });
}

export async function getOrderById(id: string) {
  if (!id) {
    throw new Error("ID nao informado");
  }

  return await db.order.findUnique({
    where: {
      id,
    },
    include: {
      items: {
        include: {
          coffee: true,
        },
        orderBy: {
          createdAt: "asc",
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
    orderBy: {
      createdAt: "asc",
    },
  });
}

export async function createOrder(data: Order) {
  return await db.$transaction(async (prisma) => {
    for (const item of data.items) {
      const coffee = await prisma.coffee.findUnique({
        where: {
          id: item.coffeeId,
        },
      });

      if (!coffee) {
        throw new Error("Cafe não encontrado");
      }
      if (coffee.stock <= 0) {
        throw new Error("Estoque insuficiente");
      }
      if (coffee.stock < item.quantity) {
        throw new Error("Estoque insuficiente");
      }
    }

    for (const item of data.items) {
      await prisma.coffee.update({
        where: {
          id: item.coffeeId,
        },
        data: {
          stock: {
            decrement: item.quantity,
          },
        },
      });
    }

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
  });
}

export async function updateStatusOrder(id: string, status: string) {
  console.log("Status recebido:", status);
  if (!Object.values(Status).includes(status as Status))
    throw new Error("Status inválido: " + status);

  return await db.order.update({
    where: {
      id,
    },
    data: {
      status: status as Status,
    },
  });
}

export async function deleteOrder(id: string) {
  if (!id) {
    throw new Error("ID nao informado");
  }

  return await db.order.delete({ where: { id } });
}
