import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(
  amount: number,
  currency = "EGP",
  locale = "en-US"
) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function relativeDateInDays(date: Date) {
  const rtf = new Intl.RelativeTimeFormat("en", {
    style: "short",
    numeric: "auto",
  });
  const currDate = new Date();
  const diffInTime = currDate.getTime() - date.getTime();
  const diffInDays = Math.round(diffInTime / (1000 * 3600 * 24));

  return rtf.format(-diffInDays, "day");
}
