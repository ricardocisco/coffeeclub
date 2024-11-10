import { getOrderItemsById } from "@/backend/services/orderService";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = (await params).id;
  try {
    if (!id) {
      return NextResponse.json({ error: "ID não informado" }, { status: 400 });
    }
    const order = await getOrderItemsById(id);
    return NextResponse.json(order);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: error, message: "Erro ao buscar Café" },
      { status: 500 }
    );
  }
}
