import { z } from "zod";

export const coffeeSchema = z.object({
  name: z
    .string()
    .min(5, { message: "o nome do café precisa ter pelo menos 5 letras" }),
  price: z.number().min(1, { message: "o preço precisa ser maior que 0" }),
  stock: z.number().min(1, { message: "a quantidade precisa ser maior que 0" }),
  description: z
    .string()
    .min(5, { message: "a descricão precisa ter pelo menos 5 letras" })
    .max(500, { message: "a descricão precisa ter menos de 500 letras" }),
  imageUrl: z
    .string()
    .min(5, { message: "a url da imagem precisa ter pelo menos 5 letras" }),
});

export type coffeeFormData = z.infer<typeof coffeeSchema>;
