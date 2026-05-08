import type { Metadata } from "next";
import { Space_Grotesk, Oxanium } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
});

const oxanium = Oxanium({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-oxanium",
  display: "swap",
  preload: true,
});

import { CurrencyInitializer } from "@/components/interactive/CurrencyInitializer";

export const metadata: Metadata = {
  title: "Diesel × Lana Del Rey — Young and Beautiful",
  description: "The Lived-In Look. 11 pieces. One collab. A limited-edition collection by Diesel and Lana Del Rey.",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${oxanium.variable}`}>
      <body className="antialiased min-h-screen flex flex-col">
        <CurrencyInitializer />
        <Navbar />
        <main id="main-content" className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
