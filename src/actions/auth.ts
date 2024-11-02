"use server";

import prisma from "@/lib/prisma_db";
import { z } from "zod";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { isRedirectError } from "next/dist/client/components/redirect";
import { FormSchema } from "@/lib/zodSchemas";

const userScheme = z.object({
  email: z.string().email(),
  name: z.string().min(4, "Name is less than 4 chars"),
});

export async function createUser(formData: FormData) {
  const email = formData.get("email") as string;
  const name = formData.get("name") as string;
  const password = formData.get("password") as string;

  try {
    await prisma.user.create({
      data: {
        email,
        name,
        password,
      },
    });
  } catch (err) {
    console.log("error creating new user", err);
    throw new Error("Error creating new user");
  }
}

export async function signinAction(
  _prevState: { error: string } | undefined,
  data: FormSchema & { callbackUrl?: string },
) {
  try {
    await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirectTo: data.callbackUrl || "/",
    });
  } catch (err: unknown) {
    if (isRedirectError(err)) {
      throw err;
    }
    if (err instanceof AuthError)
      return { error: String(err.cause?.err).replace("Error:", "") };
    return { error: "Problem connecting with the server!" };
  }
}
// export async function signinAction(
//   _prevState: { error: string } | undefined,
//   data: FormData,
// ) {
//   try {
//     await signIn("credentials", {
//       email: data.get("email"),
//       password: data.get("password"),
//       redirectTo: (data.get("callbackUrl") as string) || "/",
//     });
//   } catch (err: unknown) {
//     if (isRedirectError(err)) {
//       throw err;
//     }
//     if (err instanceof AuthError)
//       return { error: String(err.cause?.err).replace("Error:", "") };
//     return { error: "Problem connecting with the server!" };
//   }
// }
