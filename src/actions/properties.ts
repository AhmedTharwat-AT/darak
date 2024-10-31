"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma_db";
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
  if (!session) redirect("/signin");

  const user = session.user;
  console.log(user);

  // try {
  //   const property = Object.fromEntries(formData) as any;

  //   const response = await prisma.property.create({
  //     data: {
  //       title: property.title,
  //       description: property.description,
  //       location: property.location,
  //       type: property.type,
  //       mode: property.mode,
  //       price: Number(property.price),
  //       space: Number(property.space),
  //       rooms: Number(property.rooms),
  //       bathrooms: Number(property.bathrooms),
  //       ownerId: property.ownerId,
  //       images: {
  //         create: { url: property.images },
  //       },
  //     },
  //   });

  //   revalidatePath("/");

  //   return { status: "success", message: "property added successfully" };
  // } catch (error) {
  //   return {
  //     status: "failed",
  //     message: error instanceof Error ? error.message : "something went wrong",
  //   };
  // }
}
