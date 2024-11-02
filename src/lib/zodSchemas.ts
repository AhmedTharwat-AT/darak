import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("invalid email address"),
  password: z.string().min(8, "password is less thnn 8 chars"),
});

export type LoginSchema = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    email: z.string().email("invalid email address"),
    name: z.string().min(4, "name is less than 4 chars!"),
    password: z.string().min(8, "password is less thnn 8 chars"),
    confirm_password: z.string(),
  })
  .superRefine(({ confirm_password, password }, ctx) => {
    if (confirm_password !== password) {
      ctx.addIssue({
        code: "custom",
        message: "passwords don't match",
        path: ["confirm_password"],
      });
    }
  });

export type RegisterSchema = z.infer<typeof registerSchema>;
