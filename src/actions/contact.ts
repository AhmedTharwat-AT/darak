"use server";

import emailjs from "@emailjs/nodejs";
import { ContactSchema } from "@/lib/zodSchemas";

export async function sendMessage(data: ContactSchema) {
  try {
    await emailjs.send(
      process.env.EMAILJS_SERVICE_ID as string,
      process.env.EMAILJS_TEMPLATE_ID as string,
      data,
      {
        publicKey: process.env.EMAILJS_PUBLIC_KEY as string,
        privateKey: process.env.EMAILJS_PRIVATE_KEY as string,
      },
    );

    return {
      type: "success",
      message: "Message sent successfully",
    };
  } catch (err) {
    return {
      type: "error",
      message: "Error sending message",
    };
  }
}
