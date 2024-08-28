"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function addProperty(
  currState: { status: string; message: string },
  formData: FormData
) {
  if (!formData.get("name"))
    return {
      status: "failed",
      message: "something went wrong",
    };

  try {
    const property = Object.fromEntries(formData) as any;

    const response = await prisma.properties.create({
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
    console.log(response);
    revalidatePath("/");

    return { status: "success", message: "property added successfully" };
  } catch (error) {
    return {
      status: "failed",
      message: error instanceof Error ? error.message : "something went wrong",
    };
  }
}
