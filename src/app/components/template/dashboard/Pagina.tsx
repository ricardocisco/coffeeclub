"use server";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "./AppSidebar";
import { ToggleTheme } from "../../theme/theme-toggle";
import { auth } from "../../../../../auth";
import { redirect } from "next/navigation";

export interface PaginaProps {
  children?: React.ReactNode;
  className?: string;
}

async function checkAdmin() {
  const session = await auth();

  return session;
}

export default async function Pagina(props: PaginaProps) {
  const session = await checkAdmin();

  if (!session || session.user.role !== "ADMIN") {
    redirect("/");
  }

  return (
    <SidebarProvider className="font-sans">
      <AppSidebar />
      <main className={`flex-1 p-3 ${props.className ?? ""}`}>
        <div className="flex justify-between">
          <SidebarTrigger />
          <ToggleTheme />
        </div>
        {props.children}
      </main>
    </SidebarProvider>
  );
}
