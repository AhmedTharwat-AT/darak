import { type ClassValue, clsx } from "clsx";
import { unstable_cache as nextCache } from "next/cache";
import { cache as reactCache } from "react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(
  amount: number,
  currency = "EGP",
  locale = "en-US",
) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function relativeDateInDays(date: unknown) {
  if (!(date instanceof Date)) return;

  const rtf = new Intl.RelativeTimeFormat("en", {
    style: "short",
    numeric: "auto",
  });
  const currDate = new Date();
  const diffInTime = currDate.getTime() - date.getTime();
  const diffInDays = Math.round(diffInTime / (1000 * 3600 * 24));

  return rtf.format(-diffInDays, "day");
}

export async function delay(amount: number = 5000) {
  await new Promise((resolve) => setTimeout(() => resolve(null), amount));
}

type cacheType = (
  cb: (...args: any[]) => Promise<any>,
  keyParts: string[],
  options: { revalidate?: number | false; tage?: string[] },
) => any;

export const cache: cacheType = (cb, keyParts, options) => {
  return nextCache(reactCache(cb), keyParts, options);
};

export const validateEmail = (email: string) =>
  email.match(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/);

export const validatePhone = (phone: string) =>
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/.test(phone);

export async function getDataURI<T extends File>(file: T) {
  const buffer = await file.arrayBuffer();
  const base64String = Buffer.from(buffer).toString("base64");
  const dataUri = `data:${file.type};base64,${base64String}`;
  return dataUri;
}

export async function formatDate(date: Date) {
  if (!(date instanceof Date)) return;

  // const dateString = date.toISOString().split("T")[0];
  // if (typeof window !== "undefined") {
  //   console.log("client : ", dateString.length);
  // } else {
  //   console.log("server : ", dateString.length);
  // }
  return 5;
}
