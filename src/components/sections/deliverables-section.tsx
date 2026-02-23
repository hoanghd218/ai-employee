import { Card, CardContent } from "@/components/ui/card";
import { DELIVERABLES_CONTENT } from "@/lib/constants";

export function DeliverablesSection() {
  return (
    <section id="deliverables" className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="font-heading text-center text-2xl font-bold text-navy sm:text-3xl md:text-4xl mb-12">
          {DELIVERABLES_CONTENT.title}
        </h2>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {DELIVERABLES_CONTENT.items.map((item) => (
            <Card
              key={item.title}
              className="border border-border shadow-sm hover:shadow-md transition-shadow"
            >
              <CardContent className="p-6">
                <span className="text-3xl">{item.icon}</span>
                <h3 className="font-heading mt-3 text-lg font-bold text-navy">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-text-muted-custom leading-relaxed">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
