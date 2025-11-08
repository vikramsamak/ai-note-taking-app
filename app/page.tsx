import { HeroSection, FeaturesSection } from "@/components/sections";
import { Footer, Navbar } from "@/components/layout";

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <main className="flex flex-col items-center">
        <HeroSection />
        <FeaturesSection />
      </main>
      <Footer />
    </>
  );
}
