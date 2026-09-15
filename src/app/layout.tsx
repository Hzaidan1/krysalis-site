import type { Metadata, Viewport } from "next";
import { Share_Tech_Mono, Chakra_Petch, Barlow } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

// Three-tier tactical/HUD type system:
// - Chakra Petch: headings (h1/h2/h3, section titles) — sharp, geometric,
//   AAA-game HUD feel.
// - Share Tech Mono: kickers, section numbers, tags, buttons, metadata —
//   digital telemetry style. (Same font that was previously used site-wide;
//   kept here for these elements specifically.)
// - Barlow: body copy — legible, effortless-reading prose so headings do
//   the work of commanding attention instead of the paragraphs fighting
//   for it.
const shareTechMono = Share_Tech_Mono({
  variable: "--font-share-tech-mono",
  subsets: ["latin"],
  weight: "400",
});

const chakraPetch = Chakra_Petch({
  variable: "--font-chakra-petch",
  subsets: ["latin"],
  weight: ["600", "700"],
});

const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "Krysalis Media | Tactical Media & Production Studio UK",
  description:
    "UK tactical media and production studio creating brand content, original films, post-production, event coverage and specialist production support.",
  openGraph: {
    title: "Krysalis Media | Tactical Media & Production Studio UK",
    description:
      "UK tactical media and production studio creating brand content, original films, post-production, event coverage and specialist production support.",
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
      <body
        className={`${shareTechMono.variable} ${chakraPetch.variable} ${barlow.variable} antialiased overflow-x-hidden`}
      >
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
