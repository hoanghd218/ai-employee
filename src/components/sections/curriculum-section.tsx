"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CURRICULUM_CONTENT } from "@/lib/constants";

export function CurriculumSection() {
  return (
    <section id="curriculum" className="bg-gray-bg py-16 md:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="font-heading text-2xl font-bold text-navy sm:text-3xl md:text-4xl">
            {CURRICULUM_CONTENT.title}
          </h2>
          <p className="mt-3 text-lg text-text-muted-custom">
            {CURRICULUM_CONTENT.subtitle}
          </p>
        </div>

        <Tabs defaultValue="week-0" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            {CURRICULUM_CONTENT.weeks.map((week, i) => (
              <TabsTrigger
                key={i}
                value={`week-${i}`}
                className="font-heading font-semibold text-sm sm:text-base data-[state=active]:text-orange data-[state=active]:border-b-2 data-[state=active]:border-orange"
              >
                {week.tab}
              </TabsTrigger>
            ))}
          </TabsList>

          {CURRICULUM_CONTENT.weeks.map((week, i) => (
            <TabsContent key={i} value={`week-${i}`}>
              <div className="rounded-xl bg-white border border-border p-6 md:p-8">
                <h3 className="font-heading text-xl font-bold text-navy mb-6">
                  {week.title}
                </h3>
                <div className="space-y-6">
                  {week.calls.map((call) => (
                    <div key={call.name}>
                      <h4 className="font-heading text-lg font-semibold text-text-main mb-3">
                        {call.name}
                      </h4>
                      <ul className="space-y-2 mb-3">
                        {call.topics.map((topic) => (
                          <li
                            key={topic}
                            className="flex items-start gap-2 text-text-muted-custom"
                          >
                            <span className="mt-1 text-orange">•</span>
                            <span>{topic}</span>
                          </li>
                        ))}
                      </ul>
                      <p className="text-sm font-medium text-green-700 bg-green-50 rounded-lg px-3 py-2">
                        → {call.outcome}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <p className="mt-6 text-center text-sm text-text-muted-custom italic">
          {CURRICULUM_CONTENT.note}
        </p>
      </div>
    </section>
  );
}
