import type { Metadata } from "next";
import "./globals.css";
import { Playfair_Display, Poppins } from "next/font/google";

import NavBar from "@/components/NavBar";

export const metadata: Metadata = {
  title: "Darak | Get Your Real State",
  description: "",
};

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div
          className={`relative overflow-hidden ${playfair.variable} ${poppins.variable}`}
        >
          <NavBar />
          <main className="min-h-[calc(100vh-104px)] grid"> {children}</main>
        </div>
      </body>
    </html>
  );
}
