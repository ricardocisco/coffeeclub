"use client";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useCoffes from "@/hooks/useCoffe";
import { coffeeFormData, coffeeSchema } from "@/schemas/coffeeSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

export default function Form() {
  const { createCoffees } = useCoffes();
  const [error, setError] = useState<string | null>(null);

  const form = useForm<coffeeFormData>({
    resolver: zodResolver(coffeeSchema),
    defaultValues: {
      name: "",
      price: 0,
      stock: 0,
      description: "",
      imageUrl: "",
    },
  });

  const onSubmit = async (data: coffeeFormData) => {
    try {
      await createCoffees(data);
      setError(null);
      form.reset();
    } catch (error) {
      console.error(error);
      setError("Erro ao criar anuncio");
    }
  };

  const handleClear = () => {
    form.reset();
  };
  return (
    <div>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {error && <p className="text-red-500">{error}</p>}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Ex: Capuccino" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preço</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => {
                      field.onChange(parseFloat(e.target.value));
                    }}
                    placeholder="Ex: 12.50"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="stock"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantidade</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => {
                      field.onChange(parseFloat(e.target.value));
                    }}
                    placeholder="Ex: 20"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descrição</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Ex: café feito com amor" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Link da Imagem</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Link da imagem" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <DialogFooter className="py-2">
            <Button variant={"destructive"} onClick={handleClear}>
              Limpar
            </Button>
            <Button type="submit">Salvar</Button>
          </DialogFooter>
        </form>
      </FormProvider>
    </div>
  );
}
