"use client";

import { useCartStore } from "@/app/store/cartStore";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Minus, Plus, Trash } from "lucide-react";

export default function Orders() {
  const { items, increaseQuantity, decreaseQuantity, removeItem, total } =
    useCartStore();

  return (
    <div className="rounded-md border w-[480px]">
      <Tabs defaultValue="cart" className="w-auto p-2">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="cart">Carrinho</TabsTrigger>
          <TabsTrigger value="order">Pedidos</TabsTrigger>
        </TabsList>
        <TabsContent value="cart">
          <div className="">
            <div className="py-2">
              {items.length > 0 ? (
                items.map((item) => (
                  <div key={item.id} className="flex py-2 justify-between">
                    <div className="flex">
                      <picture>
                        <img
                          className="w-20 h-20 object-cover rounded-sm"
                          src={item.imageUrl}
                          alt={item.name}
                        />
                      </picture>
                      <div className="ml-3">
                        <p>{item.name}</p>
                        <p>R${item.price.toFixed(2)}</p>
                      </div>
                    </div>
                    <div className="flex flex-col justify-between items-end">
                      <Button
                        className="text-red-600"
                        variant={"outline"}
                        size={"sm"}
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash />
                      </Button>
                      <div className="flex items-center gap-2">
                        <Button
                          variant={"outline"}
                          size={"sm"}
                          onClick={() => decreaseQuantity(item.id)}
                        >
                          <Minus />
                        </Button>
                        <p>{item.quantity}</p>
                        <Button
                          variant={"outline"}
                          size={"sm"}
                          onClick={() => increaseQuantity(item.id)}
                        >
                          <Plus />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>Seu carrinho está vazio</p>
              )}
            </div>
            <div className="flex justify-between">
              <p>Sub Total</p>
              <p>R${total.toFixed(2)}</p>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="order">
          <Card className="p-2">Teste</Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
