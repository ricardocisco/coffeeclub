import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import React, { ReactNode } from "react";

export interface CardProps {
  label: string;
  icon: ReactNode;
  data: string | number;
}

export default function InfoCard({ label, icon, ...props }: CardProps) {
  return (
    <Card className="flex-1 p-4">
      <div className="flex flex-row items-center justify-between">
        <Label>{label}</Label>
        {icon}
      </div>
      <Label className="text-2xl">{props.data}</Label>
    </Card>
  );
}
