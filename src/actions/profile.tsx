"use server";

import prisma from "@/lib/prisma_db";
import { auth, signOut } from "@/auth";
import { EditUserInfoSchema } from "@/lib/zodSchemas";
import { revalidatePath } from "next/cache";
import { isRedirectError } from "next/dist/client/components/redirect";
import { redirect } from "next/navigation";

export async function editUserInfo(data: EditUserInfoSchema) {
  try {
    const session = await auth();
    if (!session?.user) redirect("/signin");

    if (data.email !== session.user.email) {
      signOut({ redirectTo: "/signin" });
    }

    await prisma.user.update({
      where: { email: data.email },
      data: data,
    });

    revalidatePath("/", "layout");

    return {
      message: "User info updated successfully",
      status: "success",
    };
  } catch (err) {
    if (isRedirectError(err)) throw err;
    if (err instanceof Error) {
      console.log("updating user info error : ", err.message);
    }
    return {
      message: "Error updating user info",
      status: "error",
    };
  }
}
