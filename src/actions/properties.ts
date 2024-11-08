"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma_db";
import { FileWithPreview } from "@/lib/types";
import { getDataURI } from "@/lib/utils";
import { CreatePropertySchema } from "@/lib/zodSchemas";
import { getUser } from "@/services/prismaApi";
import { User } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { v2 as cloudinary } from "cloudinary";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function createProperty(data: CreatePropertySchema) {
  const session = await auth();
  if (!session) redirect("/signin");

  try {
    // upload images to cloudinary
    const images = await Promise.all(
      data.images.map(async (image) => {
        const dataUri = await getDataURI(image);

        const uploadedImage = await cloudinary.uploader.upload(dataUri, {
          upload_preset: "darak",
          folder: "properties",
          resource_type: "image",
          use_asset_folder_as_public_id_prefix: true,
        });

        return {
          url: uploadedImage.secure_url,
          public_id: uploadedImage.public_id,
        };
      }),
    );

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
        phone: data.phone,
        whatsapp: data.whatsapp,
        ownerId: user.id,
        images: {
          createMany: { data: images },
        },
      },
    });

    revalidatePath("/");

    return { status: "success", message: "property was added successfully" };
  } catch (error) {
    console.log("server error : ", error instanceof Error && error.message);
    return {
      status: "failed",
      message: "something went wrong",
    };
  }
}
export async function deleteProperty({
  propertyId,
  message,
}: {
  propertyId: string;
  message: string;
}) {
  const session = await auth();
  if (!session) redirect("/signin");

  try {
    const property = await prisma.property.findUnique({
      where: {
        id: propertyId,
      },
      include: {
        images: true,
      },
    });
    // delete property images from cloudinary
    const imagesPublicIds = property?.images.map((image) => image.public_id);
    if (imagesPublicIds) {
      await cloudinary.api.delete_resources(imagesPublicIds);
    }
    // delete property from database
    await prisma.property.delete({
      where: {
        id: propertyId,
      },
    });

    revalidatePath("/");

    return { propertyId, message: "property was deleted successfully" };
  } catch (error) {
    console.log("server error : ", error instanceof Error && error.message);
    return {
      propertyId,
      message: "something went wrong",
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
