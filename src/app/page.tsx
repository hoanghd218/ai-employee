import { AnimateOnScroll } from "@/components/shared/animate-on-scroll";
import { HeroSection } from "@/components/sections/hero-section";
import { ProblemSection } from "@/components/sections/problem-section";
import { SolutionSection } from "@/components/sections/solution-section";
import { CredibilitySection } from "@/components/sections/credibility-section";
import { CurriculumSection } from "@/components/sections/curriculum-section";
import { DeliverablesSection } from "@/components/sections/deliverables-section";
import { PricingSection } from "@/components/sections/pricing-section";
import { FaqSection } from "@/components/sections/faq-section";
import { FinalCtaSection } from "@/components/sections/final-cta-section";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AnimateOnScroll>
        <ProblemSection />
      </AnimateOnScroll>
      <AnimateOnScroll>
        <SolutionSection />
      </AnimateOnScroll>
      <AnimateOnScroll>
        <CredibilitySection />
      </AnimateOnScroll>
      <AnimateOnScroll>
        <CurriculumSection />
      </AnimateOnScroll>
      <AnimateOnScroll>
        <DeliverablesSection />
      </AnimateOnScroll>
      <AnimateOnScroll>
        <PricingSection />
      </AnimateOnScroll>
      <AnimateOnScroll>
        <FaqSection />
      </AnimateOnScroll>
      <AnimateOnScroll>
        <FinalCtaSection />
      </AnimateOnScroll>
    </>
  );
}
