"use client";

import useOrder from "@/hooks/useOrder";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { ChevronsUpDown } from "lucide-react";

export default function ListOrder() {
  const { fetchById, order } = useOrder();

  console.log(order);

  return (
    <div>
      <Collapsible>
        <CollapsibleTrigger asChild>
          <Button variant="outline">
            Pedido:
            <ChevronsUpDown />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          Yes. Free to use for personal and commercial projects. No attribution
          required.
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
