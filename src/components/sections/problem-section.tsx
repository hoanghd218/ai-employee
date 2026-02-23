import { PROBLEM_CONTENT } from "@/lib/constants";

export function ProblemSection() {
  const { comparison } = PROBLEM_CONTENT;

  return (
    <section id="problem" className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="font-heading text-2xl font-bold text-navy sm:text-3xl md:text-4xl">
            {PROBLEM_CONTENT.title}
          </h2>
          <p className="mt-4 text-lg text-text-muted-custom max-w-2xl mx-auto">
            {PROBLEM_CONTENT.subtitle}
          </p>
        </div>

        {/* Pain points grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-16">
          {PROBLEM_CONTENT.painPoints.map((point) => (
            <div
              key={point.title}
              className="rounded-xl border border-border bg-white p-6 text-center shadow-sm"
            >
              <span className="text-3xl">{point.icon}</span>
              <h3 className="font-heading mt-3 text-lg font-semibold text-navy">
                {point.title}
              </h3>
              <p className="mt-2 text-sm text-text-muted-custom">
                {point.description}
              </p>
            </div>
          ))}
        </div>

        {/* Before/After comparison */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 max-w-4xl mx-auto">
          <div className="rounded-xl border-2 border-red-200 bg-red-50 p-6">
            <h3 className="font-heading text-lg font-bold text-red-700 mb-4">
              ❌ {comparison.before.label}
            </h3>
            <ul className="space-y-3">
              {comparison.before.items.map((item) => (
                <li key={item} className="flex items-start gap-2 text-red-800">
                  <span className="mt-1 text-red-400">→</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border-2 border-green-200 bg-green-50 p-6">
            <h3 className="font-heading text-lg font-bold text-green-700 mb-4">
              ✅ {comparison.after.label}
            </h3>
            <ul className="space-y-3">
              {comparison.after.items.map((item) => (
                <li key={item} className="flex items-start gap-2 text-green-800">
                  <span className="mt-1 text-green-400">→</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
