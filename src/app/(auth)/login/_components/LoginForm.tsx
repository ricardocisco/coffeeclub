import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import login from "../_actions/login";

export default function LoginForm() {
  return (
    <div className="flex h-full items-center justify-center">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Login</CardTitle>
          <CardDescription className="text-center">
            Entrar com email e senha
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={login}>
            <div className="py-2">
              <Label className="text-lg">E-mail</Label>
              <Input
                name="email"
                type="email"
                placeholder="example@gmail.com"
              ></Input>
            </div>
            <div className="py-2">
              <Label className="text-lg">Senha</Label>
              <Input
                name="password"
                type="password"
                placeholder="sua senha"
              ></Input>
            </div>
            <div className="flex flex-col py-4 gap-4">
              <Button>Login</Button>
              <div className="flex justify-between">
                <Link className="text-sm" href="/">
                  Esqueci a senha
                </Link>
                <Link className="text-sm" href="/register">
                  Criar uma nova conta
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
