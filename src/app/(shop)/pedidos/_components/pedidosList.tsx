import { Label } from "@/components/ui/label";
import { auth } from "../../../../../auth";
import ListOrder from "./listOrderId";

export default async function PedidoList() {
  const session = await auth();
  const user = session?.user;
  const userId = user?.id;

  return (
    <div className="lg:w-[1040px] w-full mx-auto p-4">
      <Label className="text-2xl">Meus Pedidos</Label>
      <div>
        {userId ? (
          <ListOrder userId={userId} />
        ) : (
          <div>Usuário não encontrado</div>
        )}
      </div>
    </div>
  );
}
