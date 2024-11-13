import Titulo from "@/app/components/shared/titulo";
import Pagina from "@/app/components/template/dashboard/Pagina";
import InfoData from "./_components/infos";

export default function Dashboard() {
  return (
    <Pagina>
      <Titulo title="Dashboard" subtitle="Acompanhar o dashboard" />
      <InfoData />
    </Pagina>
  );
}
