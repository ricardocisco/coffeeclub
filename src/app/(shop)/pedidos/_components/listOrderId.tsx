"use client";

import useOrder from "@/hooks/useOrder";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { ChevronsUpDown, Clock, PackageCheck, Truck, X } from "lucide-react";
import useUsers from "@/hooks/useUsers";
import { useEffect, useRef } from "react";
import { Label } from "@/components/ui/label";
import { Status } from "@prisma/client";

const StatusIcons = {
  PENDENTE: <Clock className="w-6 h-6 text-orange-600" />,
  ENVIADO: <Truck className="w-6 h-6 text-green-600" />,
  ENTREGUE: <PackageCheck className="w-6 h-6 text-blue-600" />,
  CANCELADO: <X className="w-6 h-6 text-red-600" />,
};

// Função para renderizar o ícone de status
function getStatusIcon(status: Status) {
  return StatusIcons[status] || null;
}

export default function ListOrder({ userId }: { userId: string }) {
  const { fetchUserById, userDetails } = useUsers();
  const { fetchById, orderDetail, loading, updateOrderId } = useOrder();

  const fetchedOrderIds = useRef(new Set());

  useEffect(() => {
    if (userId && !userDetails) {
      fetchUserById(userId);
    }
  }, [userId, userDetails, fetchUserById]);

  useEffect(() => {
    if (userDetails?.Order?.length > 0) {
      const fetchDetails = async () => {
        for (const order of userDetails.Order) {
          if (!fetchedOrderIds.current.has(order.id)) {
            fetchedOrderIds.current.add(order.id);
            await fetchById(order.id);
          }
        }
      };

      fetchDetails();
    }
  }, [userDetails, fetchById]);

  return (
    <div>
      {loading ? (
        <p>Carregando...</p>
      ) : orderDetail.length === 0 ? (
        <div>
          <p>Você ainda não possui nenhum pedido</p>
        </div>
      ) : (
        orderDetail
          .slice()
          .sort(
            (a, b) =>
              new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          )
          .map((order) => (
            <div key={order.id} className="py-2">
              <Collapsible>
                <CollapsibleTrigger asChild>
                  <Button variant="outline">
                    Pedido: {order.id}
                    <ChevronsUpDown />
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="rounded-md border p-4 mt-2">
                  <div className="flex flex-col sm:flex-row text-start justify-between">
                    <div>
                      <Label>Pedido:</Label>
                      <p>{order.id}</p>
                    </div>
                    <div>
                      <Label>Total:</Label>
                      <p>R$ {order.total.toFixed(2)}</p>
                    </div>
                    <div>
                      <Label>Status:</Label>
                      <div className="flex items-center gap-2">
                        <p>{getStatusIcon(order.status)}</p>
                        <p>{order.status}</p>
                      </div>
                    </div>
                    <div>
                      <Label>Data do Pedido:</Label>
                      <p>
                        {new Date(order.createdAt).toLocaleString("pt-BR", {
                          day: "numeric",
                          month: "numeric",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                  {order.items?.length > 0 ? (
                    <ul>
                      {order.items.map((item) => (
                        <li key={item.id} className="flex gap-2 py-2">
                          <picture>
                            <img
                              className="sm:w-28 sm:h-28 w-20 h-20 rounded-sm"
                              src={item.coffee.imageUrl}
                              alt={item.coffee.name}
                            />
                          </picture>
                          <div>
                            <p>{item.coffee.name}</p>
                            <p>R$ {item.coffee.price.toFixed(2)}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>Carregando itens...</p>
                  )}
                  <div>
                    {order.status === "CANCELADO" ||
                    order.status === "ENTREGUE" ? (
                      <div>Pedido Cancelado</div>
                    ) : (
                      <Button
                        variant={"destructive"}
                        onClick={() => updateOrderId(order.id, "CANCELADO")}
                      >
                        Cancelar Pedido <X />
                      </Button>
                    )}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
          ))
      )}
    </div>
  );
}
