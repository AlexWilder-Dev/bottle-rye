import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans, Caveat } from "next/font/google";
import CustomCursor from "@/components/CustomCursor";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-dm-sans",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-caveat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bottle + Rye — Natural Wine Bar, Brixton Village",
  description:
    "An independent natural wine bar in Brixton Village, London. Rotating chef residencies, carefully chosen wines, neighbourhood spirit.",
  openGraph: {
    title: "Bottle + Rye",
    description:
      "Natural wine bar in Brixton Village. Rotating chef residencies, carefully chosen wines.",
    type: "website",
    locale: "en_GB",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB">
      <body
        className={`${cormorant.variable} ${dmSans.variable} ${caveat.variable} antialiased`}
      >
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
