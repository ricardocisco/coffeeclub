"use server";
import { getAllUsers } from "@/backend/services/userService";

import { NextResponse } from "next/server";

export async function GET() {
  try {
    const users = await getAllUsers();
    return NextResponse.json(users);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: error, message: "Erro ao buscar usuários" },
      { status: 500 }
    );
  }
}
