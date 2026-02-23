import { SOLUTION_CONTENT } from "@/lib/constants";

export function SolutionSection() {
  return (
    <section id="solution" className="bg-gray-bg py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="font-heading text-2xl font-bold text-navy sm:text-3xl md:text-4xl">
            {SOLUTION_CONTENT.title}
          </h2>
          <p className="mt-4 text-lg text-text-muted-custom max-w-2xl mx-auto">
            {SOLUTION_CONTENT.subtitle}
          </p>
        </div>

        {/* 3 pillars */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 mb-12">
          {SOLUTION_CONTENT.pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="rounded-xl bg-white p-8 text-center shadow-sm border border-border"
            >
              <span className="text-4xl">{pillar.icon}</span>
              <h3 className="font-heading mt-4 text-xl font-bold text-navy">
                {pillar.title}
              </h3>
              <p className="mt-3 text-text-muted-custom leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>

        {/* Analogy */}
        <div className="mx-auto max-w-3xl rounded-xl bg-navy p-6 md:p-8 text-center">
          <p className="text-white/90 text-lg leading-relaxed italic">
            &ldquo;{SOLUTION_CONTENT.analogy}&rdquo;
          </p>
        </div>
      </div>
    </section>
  );
}
