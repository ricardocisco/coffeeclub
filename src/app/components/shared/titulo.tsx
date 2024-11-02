export interface TituloProps {
  title: string;
  subtitle: string;
}

export default function Titulo(props: TituloProps) {
  return (
    <div>
      <p className="text-2xl">{props.title}</p>
      <p className="text-sm text-zinc-400">{props.subtitle}</p>
    </div>
  );
}
