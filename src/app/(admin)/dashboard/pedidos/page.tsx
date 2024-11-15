import Titulo from "@/app/components/shared/titulo";
import Pagina from "@/app/components/template/dashboard/Pagina";
import OrderList from "./_components/OrderList";

export default function Pedidos() {
  return (
    <Pagina>
      <Titulo title="Pedidos" subtitle="Verificar pedidos" />
      <div className="w-full py-2">
        <div>
          <OrderList />
        </div>
      </div>
    </Pagina>
  );
}
