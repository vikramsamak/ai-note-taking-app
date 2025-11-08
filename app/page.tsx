import Navbar from "@/components/navbar";
import HeroSection from "@/components/sections/hero-section";
import FeaturesSection from "@/components/sections/features-section";
import Footer from "@/components/sections/footer";

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
