import Titulo from "@/app/components/shared/titulo";
import Pagina from "@/app/components/template/dashboard/Pagina";
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
      <div className="py-4">
        <div>
          <p>Seja bem-vindo! {user?.name ?? ""}</p>
        </div>
      </div>
    </Pagina>
  );
}
