"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQ_CONTENT } from "@/lib/constants";

export function FaqSection() {
  return (
    <section id="faq" className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        <h2 className="font-heading text-center text-2xl font-bold text-navy sm:text-3xl md:text-4xl mb-12">
          {FAQ_CONTENT.title}
        </h2>

        <Accordion type="single" collapsible className="w-full space-y-3">
          {FAQ_CONTENT.questions.map((item, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="rounded-xl border border-border bg-white px-4 shadow-sm"
            >
              <AccordionTrigger className="font-heading text-left font-semibold text-navy hover:text-orange py-4">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-text-muted-custom leading-relaxed pb-4">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
