"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma_db";
import { CreatePropertySchema } from "@/lib/zodSchemas";
import { getUser } from "@/services/prismaApi";
import { User } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createProperty(data: CreatePropertySchema) {
  const session = await auth();
  if (!session) redirect("/signin");

  try {
    const user: User = await getUser(session.user?.email);

    await prisma.property.create({
      data: {
        title: data.title,
        description: data.description,
        location: data.location,
        type: data.type,
        mode: data.mode,
        price: Number(data.price),
        space: Number(data.space),
        rooms: Number(data.rooms),
        bathrooms: Number(data.bathrooms),
        ownerId: user.id,
        images: {
          create: { url: data.title },
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

export async function bookmarkProperty(state: {
  message: string;
  propertyId: string;
}) {
  const session = await auth();
  if (!session?.user) redirect("/signin");

  try {
    const user: User = await getUser(session.user.email);
    await prisma.bookmarkedProperty.create({
      data: {
        userId: user.id,
        propertyId: state.propertyId,
      },
    });

    revalidatePath("/bookmark");

    return { ...state, message: "Property bookmarked!" };
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError) {
      if (err.code === "P2002") {
        // this property is already bookmarked to the user
        console.log("This property is already bookmarked!");
        return { ...state, message: "This property is already bookmarked!" };
      }
    }
    console.log("unexpected error bookmarking property!");
    return { ...state, message: "Unexpected error bookmarking property!" };
  }
}

export async function remvoeBookmarked(state: {
  message: string;
  propertyId: string;
}) {
  const session = await auth();
  if (!session?.user) redirect("/signin");

  try {
    const user: User = await getUser(session.user.email);
    await prisma.bookmarkedProperty.delete({
      where: {
        propertyId_userId: {
          propertyId: state.propertyId,
          userId: user.id,
        },
      },
    });

    revalidatePath("/bookmark");

    return { ...state, message: "Property removed!" };
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError) {
      if (err.code === "P2025") {
        // this property is already removed from bookmarks
        console.log("This property is already removed!");
        return { ...state, message: "This property is already removed!" };
      }
    }
    console.log("unexpected error removing property!");
    return { ...state, message: "Unexpected error removing property!" };
  }
}
