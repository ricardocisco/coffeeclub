"use server";
import { deleteCoffee } from "@/backend/services/coffeeService";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = (await params).id;

  try {
    if (!id) {
      return NextResponse.json({ error: "ID não informado" }, { status: 400 });
    }

    const result = await deleteCoffee(id);
    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: error, message: "Erro ao deletar cafe" },
      { status: 500 }
    );
  }
}
