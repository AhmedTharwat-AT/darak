"use server";

import { auth, signOut } from "@/auth";
import prisma from "@/lib/prisma_db";
import { getDataURI } from "@/lib/utils";
import { CreatePropertySchema } from "@/lib/zodSchemas";
import { getUser } from "@/services/prismaApi";
import { User } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { v2 as cloudinary } from "cloudinary";
import { revalidatePath } from "next/cache";
import { isRedirectError } from "next/dist/client/components/redirect";
import { redirect } from "next/navigation";
import { signoutAction } from "./auth";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function createProperty(data: CreatePropertySchema) {
  try {
    const session = await auth();
    if (!session?.user) redirect("/en/signin");

    const user: User = await getUser(session.user?.email);
    if (!user || user.email !== session.user.email) {
      await signoutAction();
    }

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

    revalidatePath("/", "layout");
    return {
      type: "success",
      message: "Property created successfully",
    };
  } catch (error) {
    if (isRedirectError(error)) throw error;

    return {
      type: "error",
      message: "something went wrong",
    };
  }
}
export async function deleteProperty({ propertyId }: { propertyId: string }) {
  const session = await auth();
  if (!session)
    return {
      type: "error",
      message: "Please sign in first!",
    };

  try {
    const user: User = await getUser(session?.user?.email);
    if (!user || user.email !== session?.user?.email) {
      await signoutAction();
    }

    const property = await prisma.property.findUnique({
      where: {
        id: propertyId,
        owner: {
          email: session.user?.email || undefined,
        },
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
        owner: {
          email: session.user?.email || undefined,
        },
      },
    });

    revalidatePath("/", "layout");

    return {
      type: "success",
      message: "Property was deleted successfully",
    };
  } catch (error) {
    if (isRedirectError(error)) throw error;

    return {
      type: "error",
      message: "Something went wrong",
    };
  }
}

export async function bookmarkProperty({
  propertyId,
}: {
  message: string;
  propertyId: string;
}) {
  try {
    const session = await auth();
    if (!session?.user) return { propertyId, message: "Please sign in first!" };

    const user: User = await getUser(session?.user?.email);
    if (!user || user.email !== session?.user?.email) {
      await signoutAction();
    }

    await prisma.bookmarkedProperty.create({
      data: {
        userId: user.id,
        propertyId: propertyId,
      },
    });

    revalidatePath("/", "layout");

    return { propertyId, message: "Property bookmarked!" };
  } catch (err) {
    if (isRedirectError(err)) throw err;

    if (err instanceof PrismaClientKnownRequestError) {
      if (err.code === "P2002") {
        return { propertyId, message: "This property is already bookmarked!" };
      }
    }

    return { propertyId, message: "Unexpected error bookmarking property!" };
  }
}

export async function removeBookmarked({
  propertyId,
}: {
  message: string;
  propertyId: string;
}) {
  try {
    const session = await auth();
    if (!session?.user) return { propertyId, message: "Please sign in first!" };

    const user: User = await getUser(session.user.email);
    if (!user || user.email !== session?.user?.email) {
      await signoutAction();
    }

    await prisma.bookmarkedProperty.delete({
      where: {
        propertyId_userId: {
          propertyId: propertyId,
          userId: user.id,
        },
      },
    });

    revalidatePath("/", "layout");

    return { propertyId, message: "Property removed!" };
  } catch (err) {
    if (isRedirectError(err)) throw err;

    if (err instanceof PrismaClientKnownRequestError) {
      if (err.code === "P2025") {
        return { propertyId, message: "This property is already removed!" };
      }
    }

    return { propertyId, message: "Unexpected error removing property!" };
  }
}
