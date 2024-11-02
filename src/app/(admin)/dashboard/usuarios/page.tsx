import Titulo from "@/app/components/shared/titulo";
import Pagina from "@/app/components/template/dashboard/Pagina";
import UsuarioForm from "./_components/usuario";

export default function Usuarios() {
  return (
    <Pagina>
      <Titulo title="Usuarios" subtitle="Cadastrar e verificar usuarios" />
      <main className="w-full">
        <UsuarioForm />
      </main>
    </Pagina>
  );
}
