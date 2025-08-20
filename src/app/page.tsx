import { Hero } from "@/app/components/Hero";
import { Features } from "@/app/components/Features";

export default async function Home() {
  return (
    <div>
      <Hero />
      <Features />
    </div>
  );
}
