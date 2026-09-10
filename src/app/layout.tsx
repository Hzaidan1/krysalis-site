import type { Metadata } from "next";
import { Share_Tech_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";

// Share Tech Mono: monospace terminal/tactical-HUD font. Used as the ONE
// font across the entire site (display AND body) per explicit request —
// previous attempts (Bebas Neue, then Michroma for display only, Inter for
// body) left body copy looking like plain prose. This is a genuine identity
// choice, not a subtle tweak — a monospace terminal font used for long body
// paragraphs is unusual, but it directly matches the "mission briefing HUD"
// direction the site has been pushed toward (teletype animation, tactical
// metadata readouts, etc).
const shareTechMono = Share_Tech_Mono({
  variable: "--font-share-tech-mono",
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
      <body className={`${shareTechMono.variable} antialiased`}>
        <Nav />
        {children}
      </body>
    </html>
  );
}
