import type { Metadata } from "next";
import { Inter, Bebas_Neue, Black_Ops_One } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

const bebas = Bebas_Neue({
  variable: "--font-bebas",
  subsets: ["latin"],
  weight: "400",
});

const blackOps = Black_Ops_One({
  variable: "--font-black-ops",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Krysalis Group | UK Tactical Media Studio",
  description:
    "Krysalis is an independent UK tactical media studio creating cinematic films, field visuals and brand content.",
  openGraph: {
    title: "Krysalis Group | UK Tactical Media Studio",
    description:
      "Cinematic films, field visuals and brand content — UK-based, available for travel.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${bebas.variable} ${blackOps.variable} antialiased`}>
        <Nav />
        {children}
      </body>
    </html>
  );
}
