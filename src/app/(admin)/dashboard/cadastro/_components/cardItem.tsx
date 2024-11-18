"use client";

import { useCartStore } from "@/app/store/cartStore";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import useCoffes from "@/hooks/useCoffe";
import { Book, ChevronsUpDown, Minus, Plus, ShoppingCart } from "lucide-react";

export default function CardItem() {
  const { toast } = useToast();
  const { coffees, loading, error } = useCoffes();
  const { addCart } = useCartStore();

  return (
    <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 gap-3">
      {loading ? (
        Array.from({ length: 20 }).map((_, index) => (
          <div key={index} className="flex flex-col space-y-3">
            <Skeleton className="h-[125px] w-[250px] rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        ))
      ) : error ? (
        <p>{error}</p>
      ) : (
        coffees.map((coffee) => (
          <Card key={coffee.id}>
            <CardContent className="p-1">
              <div className="relative">
                <picture>
                  <img
                    src={coffee.imageUrl}
                    alt={coffee.name}
                    className="w-full object-cover h-full rounded-md"
                  ></img>
                </picture>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant={"outline"}
                      className="absolute top-2 right-2"
                      size="sm"
                    >
                      <ChevronsUpDown className="w-4 h-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-2">
                        <Book /> Detalhe do produto
                      </DialogTitle>
                      <DialogDescription>Detalhe e pedido</DialogDescription>
                    </DialogHeader>
                    <div>
                      <Tabs defaultValue="details" className="w-auto">
                        <TabsList className="grid w-full grid-cols-2">
                          <TabsTrigger value="details">Detalhes</TabsTrigger>
                          <TabsTrigger value="order">Pedido</TabsTrigger>
                        </TabsList>
                        <TabsContent value="details">
                          <Card className="p-2">
                            <div className="flex">
                              <picture>
                                <img
                                  className="h-[80px] w-[80px] rounded-sm"
                                  src={coffee.imageUrl}
                                  alt={coffee.name}
                                />
                              </picture>
                              <div className="flex flex-col gap-2 ml-4 justify-between">
                                <p>{coffee.name}</p>
                                <p>R${coffee.price.toFixed(2)}</p>
                              </div>
                            </div>
                            <div className="py-4">
                              <p>Descrição</p>
                              <Label>{coffee.description}</Label>
                            </div>
                          </Card>
                        </TabsContent>
                        <TabsContent value="order">
                          <Card className="p-2">
                            <div className="flex justify-between">
                              <picture>
                                <img
                                  className="h-[80px] w-[80px] rounded-sm"
                                  src={coffee.imageUrl}
                                  alt={coffee.name}
                                />
                              </picture>
                              <div className="flex flex-col gap-2 ml-4 justify-between">
                                <p>{coffee.name}</p>
                                <p>R${coffee.price.toFixed(2)}</p>
                              </div>
                              <div className="flex items-center  gap-2">
                                <Button variant={"outline"} size={"sm"}>
                                  <Minus />
                                </Button>
                                <p>10</p>
                                <Button variant={"outline"} size={"sm"}>
                                  <Plus />
                                </Button>
                              </div>
                            </div>
                            <div className="py-2">
                              <Label>Selecione um copo</Label>
                              <RadioGroup className="py-1">
                                <div className="flex p-2 justify-between items-center rounded-md border">
                                  <Label>Pequeno (Quente)</Label>
                                  <RadioGroupItem value="small" />
                                </div>
                                <div className="flex p-2 justify-between items-center rounded-md border">
                                  <Label>Médio (Gelado)</Label>
                                  <RadioGroupItem value="medium" />
                                </div>
                                <div className="flex p-2 justify-between items-center rounded-md border">
                                  <Label>Grande (Gelado)</Label>
                                  <RadioGroupItem value="large" />
                                </div>
                              </RadioGroup>
                            </div>
                            <div className="py-1">
                              <Label>Medida do açucar</Label>
                              <RadioGroup className="py-1">
                                <div className="flex p-2 justify-between items-center rounded-md border">
                                  <Label>Menos Açucar</Label>
                                  <RadioGroupItem value="less" />
                                </div>
                                <div className="flex p-2 justify-between items-center rounded-md border">
                                  <Label>Normal</Label>
                                  <RadioGroupItem value="normal" />
                                </div>
                              </RadioGroup>
                            </div>
                            <div className="py-1">
                              <Label>Topo</Label>
                              <RadioGroup className="py-1">
                                <div className="flex p-2 justify-between items-center rounded-md border">
                                  <Label>Bolinhas de Boba (R$4.50)</Label>
                                  <RadioGroupItem value="boba" />
                                </div>
                                <div className="flex p-2 justify-between items-center rounded-md border">
                                  <Label>Gelatina de Coco (R$3.50)</Label>
                                  <RadioGroupItem value="coco" />
                                </div>
                                <div className="flex p-2 justify-between items-center rounded-md border">
                                  <Label>Gelatina de café (R$3.50)</Label>
                                  <RadioGroupItem value="cafe" />
                                </div>
                                <div className="flex p-2 justify-between items-center rounded-md border">
                                  <Label>Espresso (R$2.50)</Label>
                                  <RadioGroupItem value="espresso" />
                                </div>
                              </RadioGroup>
                            </div>
                            <Button
                              variant={"outline"}
                              className="w-full bg-blue-600 text-white"
                            >
                              Adicionar ao Carrinho (R${coffee.price.toFixed(2)}
                              )
                            </Button>
                          </Card>
                        </TabsContent>
                      </Tabs>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="flex flex-col pt-4">
                <CardTitle>{coffee.name}</CardTitle>
                <CardDescription>R${coffee.price.toFixed(2)}</CardDescription>
                <CardDescription>Estoque: {coffee.stock}</CardDescription>
              </div>
              <Button
                variant={"outline"}
                size={"sm"}
                onClick={() => {
                  addCart(coffee);
                  toast({
                    title: "Adicionado ao carrinho",
                    description: "Café adicionado ao carrinho com sucesso :)",
                  });
                }}
              >
                <ShoppingCart />
              </Button>
            </CardFooter>
          </Card>
        ))
      )}
    </div>
  );
}
