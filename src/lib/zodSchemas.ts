import { z } from "zod";

export const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "password is less then 8 chars"),
});

export type FormSchema = z.infer<typeof formSchema>;
