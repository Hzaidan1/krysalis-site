import type { Metadata } from "next";
import ProductionSupportClient from "./ProductionSupportClient";

export const metadata: Metadata = {
  title: "Tactical Production Support for Film & Screen | Krysalis Media",
  description:
    "Practical support for productions working inside the tactical world — supporting artists, performance preparation, kit and loadout support, continuity and on-set support.",
};

export default function ProductionSupportPage() {
  return <ProductionSupportClient />;
}
