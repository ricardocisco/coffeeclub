import db from "@/lib/db";
import { Prisma } from "@prisma/client";

export async function getAllUsers() {
  return await db.user.findMany();
}

export async function getUserById(id: string) {
  if (!id) throw new Error("ID nao informado");

  return await db.user.findUnique({ where: { id }, include: { Order: true } });
}
export async function deleteUser(id: string) {
  try {
    const result = await db.user.delete({ where: { id } });
    if (!result) throw new Error("Erro ao deletar usuário");
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function updateUser(id: string, data: Prisma.UserUpdateInput) {
  try {
    const result = await db.user.update({ where: { id }, data });
    if (!result) throw new Error("Erro ao atualizar usuário");
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
