import { Role as PrismaRole } from "@prisma/client";

export type Role = PrismaRole;

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  password: string;
}
