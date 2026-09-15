import type { Metadata } from "next";
import WorkPageClient from "./WorkPageClient";

export const metadata: Metadata = {
  title: "Selected Work | Krysalis Media",
  description:
    "Original productions, commissioned work, brand collaborations and post-production — with our role clearly defined on every project.",
};

export default function WorkPage() {
  return <WorkPageClient />;
}
