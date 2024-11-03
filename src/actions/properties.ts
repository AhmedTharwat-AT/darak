"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma_db";
import { PropertyWithImages } from "@/lib/types";
import { getProperty, getUser } from "@/services/prismaApi";
import { User } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { equal } from "assert";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function addProperty(
  _currState: { status: string; message: string },
  formData: FormData,
) {
  const session = await auth();
  if (!session) redirect("/signin");

  if (!formData.get("name"))
    return {
      status: "failed",
      message: "something went wrong",
    };

  try {
    const property = Object.fromEntries(formData) as any;

    await prisma.property.create({
      data: {
        title: property.title,
        description: property.description,
        location: property.location,
        type: property.type,
        mode: property.mode,
        price: Number(property.price),
        space: Number(property.space),
        rooms: Number(property.rooms),
        bathrooms: Number(property.bathrooms),
        ownerId: property.ownerId,
        images: {
          create: { url: property.images },
        },
      },
    });

    revalidatePath("/");

    return { status: "success", message: "property added successfully" };
  } catch (error) {
    return {
      status: "failed",
      message: error instanceof Error ? error.message : "something went wrong",
    };
  }
}

export async function bookmarkProperty(propertyId: string) {
  const session = await auth();
  if (!session?.user) redirect("/signin");

  try {
    const user: User = await getUser(session.user.email);

    const newBookmarked = await prisma.bookmarkedProperty.create({
      data: {
        userId: user.id,
        propertyId,
      },
    });

    console.log(newBookmarked);
    revalidatePath("/bookmark");
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError) {
      if (err.code === "P2002") {
        // this property is already bookmarked to the user
        console.log(
          "There is a unique constraint violation, a new user cannot be created with this email",
        );
        return;
      }
    }
    console.log("unexpected error bookmarking property!");
  }
}
