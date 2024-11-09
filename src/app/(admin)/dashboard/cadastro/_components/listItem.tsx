"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import useCoffes from "@/hooks/useCoffe";
import { Trash } from "lucide-react";

export default function ListItem() {
  const { coffees, deleteCoffees } = useCoffes();
  const { toast } = useToast();

  return (
    <div className="rounded-sm border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Imagem</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead>Preco</TableHead>
            <TableHead>Quantidade</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {coffees.map((coffee) => (
            <TableRow key={coffee.id}>
              <TableCell>
                <picture>
                  <img
                    className="w-[50px] h-[50px] rounded-sm"
                    src={coffee.imageUrl}
                    alt={coffee.name}
                  ></img>
                </picture>
              </TableCell>
              <TableCell>{coffee.name}</TableCell>
              <TableCell>R$ {coffee.price.toFixed(2)}</TableCell>
              <TableCell>{coffee.stock}</TableCell>
              <TableCell>
                <Button
                  variant={"ghost"}
                  size={"sm"}
                  onClick={() => {
                    try {
                      deleteCoffees(coffee.id);
                      toast({
                        title: "Sucesso",
                        description: "Café deletado com sucesso",
                        variant: "default",
                      });
                    } catch (error) {
                      console.error(error);
                      toast({
                        title: "Erro",
                        description: "Erro ao deletar o cafe",
                        variant: "destructive",
                      });
                    }
                  }}
                >
                  <Trash className="text-red-600 h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
