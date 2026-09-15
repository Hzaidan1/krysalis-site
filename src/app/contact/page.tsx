import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Start a Project | Krysalis Media",
  description:
    "Full production, post-production, brand content, event coverage or tactical production support — tell us what you're working on.",
};

export default function ContactPage() {
  return <ContactClient />;
}
