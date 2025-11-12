import { HeroSection } from "@/components/sections/hero";
import { DeviseSection } from "@/components/sections/devise";
import { AboutSection } from "@/components/sections/about";
import { FaqSection } from "@/components/sections/faq";
import { CallToActionSection } from "@/components/sections/cta";

export default function Home() {
  return (
    <main className="bg-linear-to-br from-slate-50 via-white to-blue-50 min-h-screen w-full px-2 md:px-0">
      <HeroSection />
      <AboutSection />
      <DeviseSection />
      <FaqSection />
      <CallToActionSection />
    </main>
  );
}
