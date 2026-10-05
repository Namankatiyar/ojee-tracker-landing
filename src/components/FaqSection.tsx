"use client";

import React, { useState, useId } from "react";
import { FAQ_ITEMS, type FaqItem } from "@/data/faqData";

export default function FaqSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const searchInputId = useId();

  const categories = [
    "All",
    "Pricing & Open Source",
    "Syllabus & Features",
    "Privacy & Offline",
    "General"
  ];

  const filteredFaqs = FAQ_ITEMS.filter((item: FaqItem) => {
    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === "" ||
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="faq" className="flex flex-col gap-8 scroll-mt-24">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="flex flex-col gap-2 max-w-2xl">
          <div className="text-sm font-semibold text-azure tracking-widest uppercase">
            Frequently Asked Questions
          </div>
          <h2 className="font-display text-3xl font-bold tracking-tight">
            Everything You Need to Know About OJEE-Tracker
          </h2>
          <p className="text-base text-muted-text">
            Clear answers about syllabus coverage, offline local storage, peer accountability, and our 100% free open-source promise.
          </p>
        </div>

        {/* Quick Search Bar */}
        <div className="relative w-full md:w-72">
          <label htmlFor={searchInputId} className="sr-only">Search FAQs</label>
          <input
            id={searchInputId}
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions (e.g. offline, free, NEET)..."
            className="w-full h-10 px-4 pl-9 rounded-lg bg-input-bg border border-subtle-border text-sm placeholder:text-muted-text-strong focus:outline-none focus:border-azure transition-colors"
          />
          <svg
            className="w-4 h-4 text-muted-text absolute left-3 top-3 pointer-events-none"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium tracking-tight whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? "bg-azure text-white shadow-sm"
                  : "bg-foreground/5 text-muted-text hover:text-foreground hover:bg-foreground/10 border border-subtle-border"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* FAQ Accordion List */}
      <div className="flex flex-col gap-3">
        {filteredFaqs.length === 0 ? (
          <div className="p-8 text-center rounded-xl border border-subtle-border bg-card-bg text-muted-text text-sm">
            No questions found matching &quot;{searchQuery}&quot;. Have a question? Reach out on our{" "}
            <a
              href="https://discord.gg/6dKrbVQU8W"
              target="_blank"
              rel="noopener noreferrer"
              className="text-azure underline hover:text-azure/80"
            >
              Discord community
            </a>
            .
          </div>
        ) : (
          filteredFaqs.map((faq) => (
            <details
              key={faq.id}
              className="group rounded-xl border border-subtle-border bg-card-bg/60 backdrop-blur-md transition-all duration-200 open:border-azure/40 open:bg-card-bg"
            >
              <summary className="flex items-center justify-between p-5 cursor-pointer list-none select-none text-left">
                <span className="font-display text-base font-semibold tracking-tight text-foreground group-hover:text-azure transition-colors pr-4">
                  {faq.question}
                </span>
                <span className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center bg-foreground/5 border border-subtle-border text-muted-text group-hover:text-foreground transition-all group-open:rotate-180 group-open:bg-azure group-open:text-white group-open:border-azure">
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </span>
              </summary>
              <div className="px-5 pb-5 pt-1 text-sm text-muted-text leading-relaxed border-t border-subtle-border/50 mt-1">
                <p>{faq.answer}</p>
              </div>
            </details>
          ))
        )}
      </div>

      {/* FAQ Bottom Support Callout */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-xl border border-subtle-border bg-foreground/[0.02]">
        <div className="flex items-center gap-3 text-sm">
          <div className="w-8 h-8 rounded-full bg-azure/10 text-azure flex items-center justify-center font-bold text-xs shrink-0">
            ?
          </div>
          <div>
            <span className="font-semibold text-foreground">Still have questions?</span>{" "}
            <span className="text-muted-text">Our open-source team and 500+ aspirants are active daily.</span>
          </div>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="https://discord.gg/6dKrbVQU8W"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded text-xs font-semibold bg-azure text-white hover:bg-azure/90 transition-colors"
          >
            Ask on Discord
          </a>
          <a
            href="https://github.com/Namankatiyar/ojeet-tracker/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded text-xs font-semibold bg-foreground/5 border border-subtle-border hover:bg-foreground/10 transition-colors"
          >
            GitHub Issues
          </a>
        </div>
      </div>
    </section>
  );
}
