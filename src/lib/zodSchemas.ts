import { parsePhoneNumber } from "libphonenumber-js";
import { z } from "zod";
import { FileWithPreview } from "./types";

export const zPhoneNumber = z
  .string({ message: "Please provide a phone number!" })
  .transform((value, ctx) => {
    // incase of optional chaining
    if (!value) {
      return value;
    }

    try {
      const phoneNumber = parsePhoneNumber(value, {
        defaultCountry: "EG",
      });

      if (!phoneNumber?.isValid()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Invalid phone number",
        });

        return z.NEVER;
      }

      return phoneNumber.number;
    } catch {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Invalid phone number",
      });

      return z.NEVER;
    }
  });

export const loginSchema = z.object({
  email: z.string().email("invalid email address"),
  password: z.string().min(8, "password is less thnn 8 chars"),
  callbackUrl: z.string().optional(),
});

export type LoginSchema = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    email: z.string().email("invalid email address"),
    name: z
      .string()
      .min(4, "name is less than 4 chars!")
      .max(20, "name is more than 20 chars!"),
    phone: zPhoneNumber,
    password: z
      .string()
      .min(8, "password is less than 8 chars")
      .max(20, "password is more than 20 chars"),
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

export const createPropertySchema = z
  .object({
    title: z
      .string()
      .min(4, "Title is less than 4 chars!")
      .max(100, "Title is more than 100 chars!"),
    description: z
      .string()
      .min(10, "Description is less than 10 chars!")
      .max(500, "Description is more than 500 chars!"),
    price: z.coerce
      .number()
      .min(10, "Please provide valid price!")
      .max(100_000_000, "Maximum price is 100,000,000 EGP!"),
    space: z.coerce
      .number()
      .min(10, "Minimum space is 10 square meters!")
      .max(10000, "Maximum space is 10000 square meters!"),
    rooms: z.coerce.number().gte(0, "Please provide valid rooms count!"),
    bathrooms: z.coerce
      .number()
      .gte(0, "Please provide valid bathrooms count!"),
    location: z
      .string({ message: "Please select a location!" })
      .min(1, "Please select a location!"),
    type: z
      .string({ message: "Please select a type!" })
      .min(3, "Please select a type!"),
    mode: z.string().min(1, "Please provide valid mode!"),
    phone: zPhoneNumber.optional(),
    whatsapp: zPhoneNumber.optional(),
    images: z
      .custom<FileWithPreview[]>()
      .refine((files) => files.length <= 3 && files.length > 0, {
        message: "Please upload maximum 3 images!",
      }),
  })
  .superRefine(({ whatsapp, phone }, ctx) => {
    if (!whatsapp && !phone) {
      ctx.addIssue({
        code: "custom",
        message: "Provide atleast one contact method!",
        path: ["whatsapp", "phone"],
      });
    }
  });

export type CreatePropertySchema = z.infer<typeof createPropertySchema>;

export const editUserInfoSchema = z.object({
  name: z
    .string()
    .min(4, "name is less than 4 chars!")
    .max(20, "name is more than 20 chars!")
    .optional(),
  phone: zPhoneNumber.optional(),
  whatsapp: zPhoneNumber.optional(),
  email: z.string().email("invalid email address"),
});

export type EditUserInfoSchema = z.infer<typeof editUserInfoSchema>;

export const contactSchema = z.object({
  name: z
    .string()
    .min(3, "name is less than 4 chars!")
    .max(20, "name is more than 20 chars!"),
  email: z.string().email("invalid email address"),
  message: z
    .string()
    .min(4, "message is less than 4 chars!")
    .max(500, "message is more than 500 chars!"),
});

export type ContactSchema = z.infer<typeof contactSchema>;
