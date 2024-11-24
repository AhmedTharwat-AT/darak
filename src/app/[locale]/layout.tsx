import { Toaster } from "@/components/ui/toaster";
import { AnimationProvider } from "@/context/AnimationProvider";
import { Playfair_Display, Poppins } from "next/font/google";
import { getDictionary } from "./dictionaries";
import TranslationProvider from "@/context/TranslationProvider";

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

async function RootLayout({
  children,
  params,
}: {
  params: Promise<{ locale: string }>;
  children: React.ReactNode;
}) {
  const locale = (await params).locale;
  const direction = locale === "ar" ? "rtl" : "ltr";
  const dictionary = await getDictionary(locale);

  return (
    <html
      lang={locale}
      dir={direction}
      className={`${playfair.variable} ${poppins.variable}`}
    >
      <body>
        <TranslationProvider dictionary={dictionary}>
          <AnimationProvider>{children}</AnimationProvider>
        </TranslationProvider>
        <Toaster />
      </body>
    </html>
  );
}

export default RootLayout;
