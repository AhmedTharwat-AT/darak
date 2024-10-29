import { Playfair_Display, Poppins } from "next/font/google";
import "./globals.css";
import { Metadata } from "next";
import { AnimationProvider } from "@/context/AnimationProvider";

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

export const metadata: Metadata = {
  title: {
    template: "%s | Darak",
    default: "Darak | Get Your Real State",
  },
  description: "",
};

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${poppins.variable}`}>
      <body>
        <AnimationProvider>{children}</AnimationProvider>
      </body>
    </html>
  );
}

export default RootLayout;
