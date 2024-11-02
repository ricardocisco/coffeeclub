"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PlusCircle } from "lucide-react";
import React, { useState } from "react";

export default function CadastroForm() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [quantidade, setQuantidade] = useState<number | "">("");
  const [items, setItems] = useState<
    Array<{ name: string; price: number; quantidade: number }>
  >([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newItem = {
      name,
      price: Number(price),
      quantidade: Number(quantidade),
    };
    setItems((prevItems) => [...prevItems, newItem]);
    setName("");
    setPrice(0);
    setQuantidade(0);
  };

  return (
    <div className="w-full">
      <div className="py-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant={"ghost"} className="bg-blue-600 text-white">
              <PlusCircle />
              Cadastrar Item
            </Button>
          </DialogTrigger>
          <DialogContent>
            <form onSubmit={handleSubmit}>
              <DialogHeader>
                <DialogTitle>Cadastar Item</DialogTitle>
                <DialogDescription>
                  Cadastrar um novo café, com os dados abaixo.
                </DialogDescription>
              </DialogHeader>
              <div>
                <div className="py-2">
                  <Label>Nome</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  ></Input>
                </div>
                <div className="py-2">
                  <Label>Preço</Label>
                  <Input
                    id="price"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    type="number"
                    required
                  ></Input>
                </div>
                <div className="py-2">
                  <Label>Quantidade</Label>
                  <Input
                    id="quantidade"
                    value={quantidade}
                    onChange={(e) => setQuantidade(Number(e.target.value))}
                    type="number"
                    required
                  ></Input>
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant={"outline"}
                  className="bg-blue-600"
                  type="submit"
                >
                  Salvar
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <div className="rounded-sm border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Preço</TableHead>
              <TableHead>Quantidade</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.name}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.price}</TableCell>
                <TableCell>{item.quantidade}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
