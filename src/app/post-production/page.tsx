import type { Metadata } from "next";
import PostProductionClient from "./PostProductionClient";

export const metadata: Metadata = {
  title: "Tactical Video Editing & Post-Production | Krysalis Media",
  description:
    "We turn supplied footage — campaign, action camera, event, night vision or thermal — into finished films, ads and social content with structure, pace and purpose.",
};

export default function PostProductionPage() {
  return <PostProductionClient />;
}
