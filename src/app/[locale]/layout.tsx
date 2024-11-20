import { Toaster } from "@/components/ui/toaster";
import { AnimationProvider } from "@/context/AnimationProvider";
import { Playfair_Display, Poppins } from "next/font/google";
import { redirect } from "next/navigation";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700", "600", "500"],
  variable: "--font-playfair",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-poppins",
});

const lacales = ["en", "ar"];

async function RootLayout({
  children,
  params,
}: {
  params: Promise<{ locale: string }>;
  children: React.ReactNode;
}) {
  const locale = (await params).locale;
  // const isLocale = lacales.includes(locale);
  const direction = locale === "ar" ? "rtl" : "ltr";

  // if (!isLocale) redirect(`/en/${locale}`);

  return (
    <html
      lang={locale}
      dir={direction}
      className={`${playfair.variable} ${poppins.variable}`}
    >
      <body>
        <AnimationProvider>{children}</AnimationProvider>
        <Toaster />
      </body>
    </html>
  );
}

export default RootLayout;
