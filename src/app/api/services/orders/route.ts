import { createOrder, getAllOrders } from "@/backend/services/orderService";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const orders = await getAllOrders();
    return NextResponse.json(orders);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: error, message: "Erro ao buscar Café" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const order = await createOrder(data);
    return NextResponse.json(order);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: error, message: "Erro ao criar Café" },
      { status: 500 }
    );
  }
}
