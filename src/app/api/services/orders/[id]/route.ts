import {
  deleteOrder,
  getOrderItemsById,
  updateStatusOrder,
} from "@/backend/services/orderService";
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
    if (error instanceof Error) {
      const message =
        error.message === "ID nao informado"
          ? "ID nao informado"
          : "Erro ao buscar Café";

      return NextResponse.json(
        { error: message },
        { status: error.message === "Erro ao buscar Café" ? 500 : 400 }
      );
    }
    return NextResponse.json(
      { error: error, message: "Erro ao buscar Café" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = (await params).id;
  try {
    if (!id) {
      return NextResponse.json({ error: "ID não informado" }, { status: 400 });
    }
    const result = await deleteOrder(id);
    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      const message =
        error.message === "ID nao informado"
          ? "ID nao informado"
          : "Erro ao buscar Café";

      return NextResponse.json(
        { error: message },
        { status: error.message === "Erro ao buscar Café" ? 500 : 400 }
      );
    }
    return NextResponse.json(
      { error: error, message: "Erro ao deletar pedido" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = (await params).id;
  const { status } = await req.json();
  try {
    if (!id) {
      return NextResponse.json({ error: "ID não informado" }, { status: 400 });
    }
    if (!status) {
      return NextResponse.json(
        { error: "Status não informado" },
        { status: 400 }
      );
    }
    const result = await updateStatusOrder(id, status);
    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: error, message: "Erro ao atualizar pedido" },
      { status: 500 }
    );
  }
}
