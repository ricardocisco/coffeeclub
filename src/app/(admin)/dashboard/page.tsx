import Titulo from "@/app/components/shared/titulo";
import Pagina from "@/app/components/template/dashboard/Pagina";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CreditCard, DollarSign, Package, UsersRound } from "lucide-react";
import { Chart } from "./_components/chart";
import InfoCard from "./_components/cards";
import { Label } from "@/components/ui/label";
import { auth } from "../../../../auth";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  let user = undefined;
  const session = await auth();

  if (session) {
    user = session.user;
  } else {
    redirect("/login");
  }

  return (
    <Pagina>
      <Titulo title="Dashboard" subtitle="Acompanhar o dashboard" />
      <div className="flex flex-col gap-4 py-4">
        <div>
          <p>Seja bem-vindo! {user?.name ?? ""}</p>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <InfoCard label="Total de vendas" icon={<DollarSign />} />
          <InfoCard label="Total de pedidos" icon={<Package />} />
          <InfoCard label="Usuarios" icon={<UsersRound />} />
          <InfoCard label="Vendas" icon={<CreditCard />} />
        </div>
        <div className="flex flex-row gap-4">
          <Chart />
          <Card>
            <CardHeader>
              <CardTitle>Ultimas vendas</CardTitle>
              <CardDescription>você fez 250 ultilmas vendas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center p-2 w-[400px]">
                <div>
                  <Label className="text-lg">Ricardo</Label>
                  <p className="text-gray-400">ricardo@teste.com</p>
                </div>
                <Label className="text-lg">R$ 60,00</Label>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Pagina>
  );
}
