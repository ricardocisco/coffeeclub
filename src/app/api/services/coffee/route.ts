"use server";
import { createCoffee, getAllCoffees } from "@/backend/services/coffeeService";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const coffees = await getAllCoffees();
    return NextResponse.json(coffees);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: error, message: "Erro ao buscar café" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const coffee = await createCoffee(data);
    return NextResponse.json(coffee);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: error, message: "Erro ao criar Café" },
      { status: 500 }
    );
  }
}
