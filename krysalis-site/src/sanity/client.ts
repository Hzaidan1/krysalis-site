import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

// Fill these in once you create a free project at sanity.io
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  useCdn: true,
});

const builder = imageUrlBuilder(client);
export function urlFor(source: string) {
  return builder.image(source);
}

// Example query shape — Work page will fetch projects like this
export const PROJECTS_QUERY = `*[_type == "project"] | order(year desc){
  _id,
  title,
  slug,
  client,
  category,
  year,
  thumbnail
}`;
