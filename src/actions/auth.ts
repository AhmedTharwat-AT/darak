"use server";

import prisma from "@/lib/prisma_db";
import { auth, signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";
import { isRedirectError } from "next/dist/client/components/redirect";
import { LoginSchema, RegisterSchema } from "@/lib/zodSchemas";
import { hash } from "bcryptjs";
import { redirect } from "next/navigation";

export async function createUser(
  data: RegisterSchema & { callbackUrl?: string },
) {
  const { email, password, name, phone } = data;
  try {
    // check if user exists
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (user) {
      throw new AuthError("User already exists");
    }
    // create user
    const hashedPassword = await hash(password, 10);
    await prisma.user.create({
      data: {
        email,
        name,
        phone,
        password: hashedPassword,
      },
    });

    redirect("/signin");
  } catch (err: unknown) {
    if (isRedirectError(err)) {
      throw err;
    }
    if (err instanceof Error) {
      console.log("error creating new user", err.message);
    }
    if (err instanceof AuthError) {
      throw new Error(String(err.cause?.err).replace("Error:", ""));
    }
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

export async function signoutAction() {
  const session = await auth();

  if (!session?.user) return null;

  await signOut({ redirectTo: "/" });
}
