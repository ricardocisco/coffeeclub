import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { auth } from "../../../../../auth";
import { Button } from "@/components/ui/button";
import { ChevronDown, CircleUser, ShoppingCart } from "lucide-react";
import Link from "next/link";
import logout from "@/app/(auth)/_actions/logout";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Orders from "./Orders";
import Count from "./Count";
import { ToggleTheme } from "@/app/components/theme/theme-toggle";

export default async function Navbar() {
  const session = await auth();
  const user = session?.user;
  const userId = user?.id;

  return (
    <nav className="flex items-center justify-between lg:w-[1040px] w-full p-4 m-auto ">
      <Link href="/" className="text-xl">
        Coffee Club
      </Link>
      <div className="flex items-center gap-2">
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <CircleUser />
                {user?.name}
                <ChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Minha conta</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <Link className="w-full" href="/pedidos">
                    Meus Pedidos
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>Configurações</DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <form action={logout}>
                <Button className="w-full" variant={"ghost"}>
                  Sair
                </Button>
              </form>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link href="/login">Login</Link>
        )}
        <div className="flex items-center gap-2">
          <ToggleTheme />
          <Sheet>
            <SheetTrigger>
              <div className="flex relative">
                <ShoppingCart className="w-6 h-6" />
                <Count />
              </div>
            </SheetTrigger>
            <SheetContent className="w-[400px] sm:w-[540px]">
              <SheetHeader>
                <SheetTitle>Carrinho</SheetTitle>
              </SheetHeader>
              <div className="h-full">
                <Orders userId={userId} />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
