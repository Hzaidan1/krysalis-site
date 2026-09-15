import type { Metadata } from "next";
import CapabilitiesClient from "./CapabilitiesClient";

export const metadata: Metadata = {
  title: "Tactical Media & Production Services | Krysalis Media",
  description:
    "Video production, post-production, brand content, tactical production support, event coverage and creative development — one studio, different ways into a project.",
};

export default function CapabilitiesPage() {
  return <CapabilitiesClient />;
}
