import { Home } from "./Home";
import { Analytics } from "@vercel/analytics/react"

export default function HomePage() {
  return (
    <main className="flex flex-col items-center w-full h-full min-h-[100dvh]">
      <Home />
      <Analytics />
    </main>
  );
}
