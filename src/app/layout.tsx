import type { Metadata } from "next";
import { Inter, Michroma } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

// Michroma: a free, geometric/squared-off tech font in the spirit of Bank
// Gothic (the real MW3 "Modern Warfare" logo font, which isn't freely
// licensable) — used as the ONE display font across the whole site.
const michroma = Michroma({
  variable: "--font-michroma",
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
      <body className={`${inter.variable} ${michroma.variable} antialiased`}>
        <Nav />
        {children}
      </body>
    </html>
  );
}
