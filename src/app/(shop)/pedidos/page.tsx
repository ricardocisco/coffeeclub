import React from "react";
import Navbar from "../home/_components/Navbar";
import PedidoList from "./_components/pedidosList";

export default function Pedidos() {
  return (
    <div className="flex flex-col font-sans">
      <Navbar />
      <PedidoList />
    </div>
  );
}
