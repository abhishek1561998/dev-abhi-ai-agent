import FuturisticHeader from "@/components/FuturisticHeader";
import HeroBanner from "@/components/HeroBanner";
import FeaturesSection from "@/components/FeaturesSection";
import SolutionsSection from "@/components/SolutionsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FuturisticFooter from "@/components/FuturisticFooter";
import AIMouseTracker from "@/components/AIMouseTracker";
import AICursor from "@/components/AICursor";

export default function Home() {
  return (
    <div className="min-h-screen bg-black overflow-x-hidden">
      {/* AI Mouse Effects - Only on landing page */}
      <AIMouseTracker />
      <AICursor />

      <FuturisticHeader />
      <HeroBanner />
      <FeaturesSection />
      <SolutionsSection />
      <TestimonialsSection />
      <FuturisticFooter />
    </div>
  );
}
