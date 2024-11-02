"use server";

import prisma from "@/lib/prisma_db";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { isRedirectError } from "next/dist/client/components/redirect";
import { LoginSchema, RegisterSchema } from "@/lib/zodSchemas";

export async function createUser(
  data: RegisterSchema & { callbackUrl?: string },
) {
  const { email, password, name } = data;
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
  data: LoginSchema & { callbackUrl?: string },
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
      throw new Error(String(err.cause?.err).replace("Error:", ""));
    throw new Error("Problem with the server!");
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
