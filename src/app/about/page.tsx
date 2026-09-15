import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About Krysalis | UK Tactical Production Studio",
  description:
    "Krysalis is an independent UK tactical media and production studio that grew inside the airsoft and tactical community. See how we work and what we develop.",
};

export default function AboutPage() {
  return <AboutClient />;
}
