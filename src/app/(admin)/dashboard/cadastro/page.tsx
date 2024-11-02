import Titulo from "@/app/components/shared/titulo";
import Pagina from "@/app/components/template/dashboard/Pagina";
import CadastroForm from "./_components/cadastro";

export default function Cadastro() {
  return (
    <Pagina>
      <Titulo title="Cadastros" subtitle="Cadastrar itens" />
      <CadastroForm />
    </Pagina>
  );
}
