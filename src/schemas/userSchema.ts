import { z } from "zod";

export const userSchema = z.object({
  name: z
    .string()
    .min(5, { message: "o nome precisa ter pelo menos 5 letras" }),
  email: z.string().email({ message: "o email precisa ser valido" }),
});

export type userFormData = z.infer<typeof userSchema>;
