import { TopBar } from "@/components/sections/TopBar";
import { Hero } from "@/components/sections/Hero";
import { GlobeSection } from "@/components/sections/GlobeSection";
import { Manifesto } from "@/components/sections/Manifesto";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <TopBar />
      <main>
        <Hero />
        <GlobeSection />
        <Manifesto />
      </main>
      <Footer />
    </>
  );
}
