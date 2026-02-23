import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PRICING_CONTENT } from "@/lib/constants";
import { CtaButton } from "@/components/shared/cta-button";
import { cn } from "@/lib/utils";

export function PricingSection() {
  return (
    <section id="pricing" className="bg-gray-bg py-16 md:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <h2 className="font-heading text-center text-2xl font-bold text-navy sm:text-3xl md:text-4xl mb-12">
          {PRICING_CONTENT.title}
        </h2>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {PRICING_CONTENT.plans.map((plan) => (
            <Card
              key={plan.name}
              className={cn(
                "relative overflow-hidden",
                plan.highlighted
                  ? "border-2 border-orange ring-2 ring-orange/20 shadow-lg"
                  : "border border-border shadow-sm"
              )}
            >
              {plan.badge && (
                <div className="absolute top-0 right-0">
                  <Badge className="rounded-none rounded-bl-lg bg-orange text-white px-3 py-1 text-xs font-semibold">
                    {plan.badge}
                  </Badge>
                </div>
              )}
              <CardHeader className="text-center pb-2 pt-8">
                <p className="text-sm font-medium text-text-muted-custom uppercase tracking-wide">
                  {plan.name}
                </p>
                <div className="mt-2">
                  <span className="font-heading text-4xl font-extrabold text-navy">
                    {plan.price}
                  </span>
                  <span className="text-text-muted-custom text-sm ml-1">
                    {plan.period}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="pt-4 pb-8">
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-sm text-text-main"
                    >
                      <span className="text-green-500 font-bold">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <CtaButton
                  text="Đăng Ký Ngay"
                  variant={plan.highlighted ? "primary" : "secondary"}
                  className="w-full"
                />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Guarantee */}
        <div className="mt-10 rounded-xl border-2 border-green-200 bg-green-50 p-6 md:p-8 text-center">
          <h3 className="font-heading text-lg font-bold text-green-800">
            🛡️ {PRICING_CONTENT.guarantee.title}
          </h3>
          <p className="mt-2 text-green-700">
            {PRICING_CONTENT.guarantee.description}
          </p>
        </div>

        {/* ROI */}
        <div className="mt-8 rounded-xl bg-white border border-border p-6 md:p-8">
          <h3 className="font-heading text-lg font-bold text-navy text-center mb-4">
            📊 {PRICING_CONTENT.roi.title}
          </h3>
          <ul className="space-y-2 max-w-xl mx-auto">
            {PRICING_CONTENT.roi.items.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 text-text-main"
              >
                <span className="mt-1 text-orange font-bold">→</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
