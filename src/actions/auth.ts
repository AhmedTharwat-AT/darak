"use server";

import prisma from "@/lib/prisma_db";
import { auth, signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";
import { isRedirectError } from "next/dist/client/components/redirect";
import { LoginSchema, registerSchema, RegisterSchema } from "@/lib/zodSchemas";
import { hash } from "bcryptjs";
import { redirect } from "next/navigation";

export async function createUser(data: RegisterSchema) {
  try {
    registerSchema.parse(data);

    const { email, password, name, phone } = data;
    // check if user exists
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (user) {
      return { type: "error", message: "User already exists" };
    }

    // create user
    const hashedPassword = await hash(password, 10);

    await prisma.user.create({
      data: {
        email,
        name,
        phone,
        password: hashedPassword,
        auth_method: "credentials",
      },
    });

    redirect("/en/signin");
  } catch (err: unknown) {
    if (isRedirectError(err)) {
      throw err;
    }

    if (err instanceof AuthError) {
      return {
        type: "error",
        message: String(err.cause?.err).replace("Error:", ""),
      };
    }

    return { type: "error", message: "Error creating new user" };
  }
}

export async function signinAction(
  data: LoginSchema & { callbackUrl?: string },
) {
  try {
    await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirectTo: data.callbackUrl || "/en",
    });

    return { type: "success", message: "Signed in successfully" };
  } catch (err: unknown) {
    if (isRedirectError(err)) {
      throw err;
    }

    if (err instanceof AuthError)
      return {
        type: "error",
        message: String(err.cause?.err).replace("Error:", ""),
      };

    return { type: "error", message: "Error signing in" };
  }
}

export async function signoutAction() {
  await signOut({ redirectTo: "/en" });
}
