import { FINAL_CTA_CONTENT } from "@/lib/constants";
import { CtaButton } from "@/components/shared/cta-button";

export function FinalCtaSection() {
  return (
    <section id="final-cta" className="bg-navy py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <h2 className="font-heading text-2xl font-bold text-white sm:text-3xl md:text-4xl">
          {FINAL_CTA_CONTENT.headline}
        </h2>
        <p className="mt-4 text-lg text-white/70 leading-relaxed">
          {FINAL_CTA_CONTENT.subtext}
        </p>
        <div className="mt-8">
          <CtaButton text={FINAL_CTA_CONTENT.ctaText} />
        </div>
      </div>
    </section>
  );
}
