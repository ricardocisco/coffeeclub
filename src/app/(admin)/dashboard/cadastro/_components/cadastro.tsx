"use client";
import CardItem from "@/app/(admin)/dashboard/cadastro/_components/cardItem";
import { Button } from "@/components/ui/button";
import { LayoutGrid, LayoutList, PlusCircle } from "lucide-react";
import { useState } from "react";
import ListItem from "./listItem";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Form from "./form";

export default function CadastroForm() {
  const [layout, setLayout] = useState<"grid" | "list">("grid");

  return (
    <div className="w-full py-2 gap-2">
      <div className="flex  justify-between py-2">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant={"ghost"} className="bg-blue-600 text-white">
              <PlusCircle />
              Adicionar Item
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Criar um novo anuncio</DialogTitle>
              <DialogDescription>
                Preencha os campos para criar um novo anuncio
              </DialogDescription>
            </DialogHeader>
            <Form />
          </DialogContent>
        </Dialog>

        {layout === "grid" ? (
          <Button variant={"ghost"} onClick={() => setLayout("list")}>
            <LayoutGrid />
          </Button>
        ) : (
          <Button variant={"ghost"} onClick={() => setLayout("grid")}>
            <LayoutList />
          </Button>
        )}
      </div>
      <div className="flex">
        {layout === "grid" ? <CardItem /> : <ListItem />}
      </div>
    </div>
  );
}
