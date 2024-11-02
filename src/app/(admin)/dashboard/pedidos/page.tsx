import Titulo from "@/app/components/shared/titulo";
import Pagina from "@/app/components/template/dashboard/Pagina";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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
import { DialogTrigger } from "@radix-ui/react-dialog";
import { PlusCircle } from "lucide-react";

export default function Pedidos() {
  return (
    <Pagina>
      <Titulo title="Pedidos" subtitle="Verificar pedidos" />
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
              <form>
                <DialogHeader>
                  <DialogTitle>Cadastar Item</DialogTitle>
                  <DialogDescription>
                    Cadastrar um novo café, com os dados abaixo.
                  </DialogDescription>
                </DialogHeader>
                <div>
                  <div className="py-2">
                    <Label>Nome</Label>
                    <Input id="name" value="" required></Input>
                  </div>
                  <div className="py-2">
                    <Label>Preço</Label>
                    <Input id="price" value="0" type="number" required></Input>
                  </div>
                  <div className="py-2">
                    <Label>Quantidade</Label>
                    <Input
                      id="quantidade"
                      value="0"
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
              <TableRow>
                <TableCell>Teste</TableCell>
                <TableCell>Teste</TableCell>
                <TableCell>Teste</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </Pagina>
  );
}
