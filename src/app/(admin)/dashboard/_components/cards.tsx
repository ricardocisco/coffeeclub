import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import React, { ReactNode } from "react";

export interface CardProps {
  label: string;
  icon: ReactNode;
}

export default function InfoCard(props: CardProps) {
  return (
    <Card className="flex-1 py-4">
      <div className="flex  flex-row gap-24 p-8 items-center justify-between">
        <Label>{props.label}</Label>
        {props.icon}
      </div>
    </Card>
  );
}
