import { Coffee } from "@/core/model/User";
import db from "@/lib/db";

export async function getAllCoffees() {
  return await db.coffee.findMany();
}

export async function createCoffee(data: Coffee) {
  return await db.coffee.create({
    data: {
      ...data,
      additions: data.additions ? { create: data.additions } : {},
      createdAt: new Date(),
    },
  });
}

export async function deleteCoffee(id: string) {
  if (!id) throw new Error("ID nao informado");

  return await db.coffee.delete({ where: { id } });
}
