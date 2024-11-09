import React from "react";
import Orders from "./_components/Orders";
import Navbar from "./_components/Navbar";
import CardItem from "@/app/(admin)/dashboard/cadastro/_components/cardItem";

export default function Page() {
  return (
    <div className="flex flex-col font-sans h-screen">
      <Navbar />
      <div className="flex justify-between p-4 gap-4">
        <div className="overflow-y-scroll max-h-[calc(100vh-100px)]">
          <CardItem />
        </div>
        <Orders />
      </div>
    </div>
  );
}
