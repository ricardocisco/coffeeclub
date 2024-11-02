"use server";
import { deleteUser, updateUser } from "@/backend/services/userService";
import { User } from "@/core/model/User";
import { NextResponse } from "next/server";

async function updateFun(id: string, data: Partial<User>) {
  if (!id) {
    throw new Error("ID não informado");
  }

  return await updateUser(id, data);
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;
  try {
    if (!id) {
      return NextResponse.json({ error: "ID não informado" }, { status: 400 });
    }

    const result = await deleteUser(id);
    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: error, message: "Erro ao deletar usuário" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const idUser = (await params).id;
  try {
    const { ...data }: { idUser: string; data: Partial<User> } =
      await req.json();
    const update = await updateFun(idUser, data as Partial<User>);
    return NextResponse.json(update);
  } catch (error) {
    console.error(error);
  }
}
