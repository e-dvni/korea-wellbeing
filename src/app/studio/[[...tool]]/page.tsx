export { viewport } from "next-sanity/studio";
export const dynamic = "force-dynamic";

import StudioClient from "./_StudioClient";

export default function StudioPage() {
  return <StudioClient />;
}
