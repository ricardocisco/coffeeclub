import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Home, LogOut, Package, PlusCircle, Users } from "lucide-react";
import Link from "next/link";
import logout from "@/app/(auth)/_actions/logout";

const items = [
  {
    title: "Home",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Cadastro",
    url: "/dashboard/cadastro",
    icon: PlusCircle,
  },
  {
    title: "Pedidos",
    url: "/dashboard/pedidos",
    icon: Package,
  },
  {
    title: "Usuarios",
    url: "/dashboard/usuarios",
    icon: Users,
  },
];

export default function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent className="flex justify-between p-4">
        <SidebarGroup>
          <SidebarGroupLabel>Dashboard - Admin</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarFooter>
          <SidebarMenu>
            <form action={logout} className="max-w-fit">
              <Button variant="ghost">
                <LogOut />
                Sair
              </Button>
            </form>
          </SidebarMenu>
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  );
}
