import Navbar from "@/components/navbar";
import HeroSection from "@/components/sections/hero-section";
import FeaturesSection from "@/components/sections/features-section";
//WILL BE ADDED LATER
// import WaitlistSection from "@/components/sections/waitlist-section";
// import TestimonialSection from "@/components/sections/testimonial-section";
import Footer from "@/components/sections/footer";

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <main className="flex flex-col items-center">
        <HeroSection />
        <FeaturesSection />
        {/* <TestimonialSection /> */}
        {/* <WaitlistSection /> */}
      </main>
      <Footer />
    </>
  );
}
