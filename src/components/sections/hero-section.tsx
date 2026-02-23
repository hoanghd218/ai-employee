import { HERO_CONTENT } from "@/lib/constants";
import { CtaButton } from "@/components/shared/cta-button";

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative bg-gray-bg py-20 md:py-32"
    >
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <h1 className="font-heading text-3xl font-extrabold leading-tight text-navy sm:text-4xl md:text-5xl lg:text-6xl">
          {HERO_CONTENT.headline}
        </h1>
        <p className="mt-6 text-lg text-text-muted-custom sm:text-xl leading-relaxed">
          {HERO_CONTENT.subheadline}
        </p>
        <div className="mt-10">
          <CtaButton text={HERO_CONTENT.ctaText} />
        </div>
        <p className="mt-6 text-sm font-medium text-orange">
          {HERO_CONTENT.socialProof}
        </p>
      </div>
    </section>
  );
}
