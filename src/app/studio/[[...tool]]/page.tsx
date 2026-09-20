import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";

// This embeds Sanity Studio directly at /studio — no separate app or
// deployment needed. Studio handles its own login (Google/GitHub/email via
// Sanity's own auth); only people added as members of the Sanity project
// can sign in and edit, which is the actual access control here — nothing
// bespoke to build or maintain on our end.
export const dynamic = "force-static";

export default function StudioPage() {
  return <NextStudio config={config} />;
}
