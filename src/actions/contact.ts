"use server";

import { auth } from "@/auth";
import { redirect } from "next/navigation";

export async function sendMessage(_prev: { message: string }, data: FormData) {
  const session = await auth();
  if (!session) {
    redirect("/signin?callbackUrl=/contact");
  }
}
