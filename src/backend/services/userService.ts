import { User } from "@/core/model/User";
import db from "@/lib/db";

export async function getAllUsers() {
  return await db.user.findMany();
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

export async function updateUser(id: string, data: Partial<User>) {
  try {
    const result = await db.user.update({ where: { id }, data });
    if (!result) throw new Error("Erro ao atualizar usuário");
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
