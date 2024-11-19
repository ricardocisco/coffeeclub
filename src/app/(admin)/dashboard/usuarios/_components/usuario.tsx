"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import useUsers from "@/hooks/useUsers";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { SelectValue } from "@radix-ui/react-select";
import { userFormData, userSchema } from "@/schemas/userSchema";
import { FormProvider, useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import DataTable from "./data-table";
import { columns as generateColumns } from "./columns";

type User = {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "USER";
};

export default function UsuarioForm() {
  const { users, updateUser, loading } = useUsers();
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [error] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<userFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: "",
      email: "",
      role: "USER",
    },
  });

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    form.reset({
      name: user.name,
      email: user.email,
      role: user.role,
    });
    setIsDialogOpen(true);
  };

  const onSubmit: SubmitHandler<userFormData> = async (data: userFormData) => {
    if (!editingUser) return;

    const { role } = data;
    if (role !== "ADMIN" && role !== "USER") {
      console.error("Role inválido");
      return;
    }

    try {
      await updateUser(editingUser.id, data);
      toast({
        title: "Sucesso",
        description: "Usuario atualizado com sucesso",
      });
      setIsDialogOpen(false);
    } catch (error) {
      console.log(error);
      toast({
        title: "Erro",
        description: "Erro ao atualizar o usuario",
        variant: "destructive",
      });
    }
  };

  const columns = generateColumns(handleEditUser);

  return (
    <div className="flex flex-col gap-4 py-4">
      {loading ? (
        Array.from({ length: 10 }).map((_, index) => (
          <div
            key={index}
            className="animate-pulse flex  justify-between items-center px-2 py-3 rounded-md bg-muted/50"
          >
            <div>
              <div className="h-4 w-24 bg-muted/50 rounded mb-1"></div>
              <div className="h-3 w-32 bg-muted/50 rounded"></div>
            </div>
            <div className="h-4 w-16 bg-muted/50 rounded"></div>
          </div>
        ))
      ) : (
        <>
          <DataTable columns={columns} data={users} />
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild></DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Editar Usuario</DialogTitle>
                <DialogDescription>
                  Preencha os campos para editar o usuario
                </DialogDescription>
              </DialogHeader>
              <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <div className="grid gap-4 py-4">
                    {error && <p className="text-red-500">{error}</p>}
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nome</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="role"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Role</FormLabel>
                          <FormControl>
                            <Select
                              value={field.value}
                              onValueChange={field.onChange}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select a role" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="ADMIN">ADMIN</SelectItem>
                                <SelectItem value="USER">USER</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <DialogFooter>
                    <Button type="submit" className="bg-blue-600 text-white">
                      Salvar
                    </Button>
                  </DialogFooter>
                </form>
              </FormProvider>
            </DialogContent>
          </Dialog>
        </>
      )}
    </div>
  );
}
