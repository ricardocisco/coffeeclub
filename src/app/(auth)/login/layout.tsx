import { ToggleTheme } from "@/app/components/theme/theme-toggle";

export interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout(props: LayoutProps) {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="p-4 w-full flex justify-end">
        <ToggleTheme />
      </div>
      {props.children}
    </div>
  );
}
