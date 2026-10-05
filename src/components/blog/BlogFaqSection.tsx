"use client";

import React, { useState } from "react";
import { BlogFaqItem } from "@/types/blog";

export default function BlogFaqSection({ faqs }: { faqs?: BlogFaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (!faqs || faqs.length === 0) return null;

  return (
    <section className="my-14 rounded-2xl border border-subtle-border bg-card-bg/60 p-6 sm:p-8 backdrop-blur-md">
      <div className="flex flex-col gap-2 mb-6">
        <span className="text-xs font-semibold uppercase tracking-wider text-azure font-mono">
          Frequently Asked Questions
        </span>
        <h3 className="font-display text-xl sm:text-2xl font-bold text-foreground">
          Clarifications & Practical Tips
        </h3>
      </div>

      <div className="flex flex-col divide-y divide-subtle-border/60">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;

          return (
            <div key={idx} className="py-4">
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full flex items-center justify-between text-left gap-4 font-display font-semibold text-sm sm:text-base text-foreground hover:text-azure transition-colors cursor-pointer"
                aria-expanded={isOpen}
              >
                <span>{faq.question}</span>
                <span className="text-azure text-lg font-mono shrink-0 transition-transform duration-200">
                  {isOpen ? "−" : "+"}
                </span>
              </button>
              {isOpen && (
                <div className="mt-3 text-xs sm:text-sm text-muted-text leading-relaxed">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
