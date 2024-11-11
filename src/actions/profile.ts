"use server";

import { auth, signOut } from "@/auth";
import prisma from "@/lib/prisma_db";
import { getDataURI, getProfilePublicId } from "@/lib/utils";
import { EditUserInfoSchema } from "@/lib/zodSchemas";
import { getUser } from "@/services/prismaApi";
import { User } from "@prisma/client";
import { v2 as cloudinary } from "cloudinary";
import { revalidatePath } from "next/cache";
import { isRedirectError } from "next/dist/client/components/redirect";
import { redirect } from "next/navigation";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

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
const supportedImageTypes = [
  "image/jpg",
  "image/jpeg",
  "image/png",
  "image/webp",
];
export async function changeProfilePicture(
  _state: { message: string; status: string },
  data: FormData,
) {
  try {
    const newImage = data.get("image") as File;
    if (!newImage) {
      return {
        message: "No image selected",
        status: "error",
      };
    }

    if (!supportedImageTypes.includes(newImage.type)) {
      return {
        message: "Invalid image type",
        status: "error",
      };
    }
    // max 1MB image
    // if (newImage.size > 1024 * 1024) {
    //   return {
    //     message: "Image size is too large",
    //     status: "error",
    //   };
    // }

    const session = await auth();
    if (!session?.user) redirect("/signin");

    const user: User = await getUser(session.user.email);

    if (!user) {
      signOut({ redirectTo: "/signin" });
    }

    // delete old image if it exists in cloudinary
    if (user.image?.startsWith("https://res.cloudinary.com")) {
      const publicId = getProfilePublicId(user.image);
      await cloudinary.uploader.destroy(publicId as string);
    }

    // upload new image to cloudinary
    const dataURI = await getDataURI(newImage);
    const result = await cloudinary.uploader.upload(dataURI, {
      upload_preset: "darak-profile",
      folder: "profile",
      resource_type: "image",
      use_asset_folder_as_public_id_prefix: true,
    });

    // update user in db
    await prisma.user.update({
      where: { email: user.email },
      data: { image: result.secure_url },
    });

    revalidatePath("/", "layout");

    return {
      message: "User image updated successfully",
      status: "success",
    };
  } catch (err) {
    console.log("server error : ", err);
    if (isRedirectError(err)) throw err;
    if (err instanceof Error) {
      console.log("updating user image error : ", err.message);
    }
    return {
      message: "Error updating user image",
      status: "error",
    };
  }
}
