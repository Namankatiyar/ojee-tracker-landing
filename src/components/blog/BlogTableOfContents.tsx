import React from "react";
import { TableOfContentsItem } from "@/types/blog";

export default function BlogTableOfContents({
  items,
}: {
  items: TableOfContentsItem[];
}) {
  if (!items || items.length === 0) return null;

  return (
    <nav
      aria-label="Table of contents"
      className="rounded-2xl border border-subtle-border bg-card-bg p-5 backdrop-blur-md sticky top-24 flex flex-col gap-4"
    >
      <div className="flex items-center gap-2 pb-3 mb-3 border-b border-subtle-border">
        <span className="w-2 h-2 rounded-full bg-azure" />
        <span className="font-display font-semibold text-xs tracking-wider uppercase text-foreground">
          Table of Contents
        </span>
      </div>
      <ul className="flex flex-col gap-2.5 text-xs text-muted-text">
        {items.map((item) => (
          <li
            key={item.id}
            style={{ paddingLeft: `${Math.max(0, (item.level - 2) * 12)}px` }}
          >
            <a
              href={`#${item.id}`}
              className="hover:text-azure transition-colors block line-clamp-1 py-0.5 leading-snug"
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>
      {/* Quick Launch Card */}
              <div className="rounded-2xl border border-subtle-border p-4 flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-foreground">
                    Try OJEE-Tracker
                  </span>
                </div>
                <a
                  href="https://tracker.ojeet.tech"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 h-10 rounded bg-foreground text-background text-xs font-semibold hover:opacity-90 transition-all cursor-pointer"
                >
                  <span>Open Tracker (Free)</span>
                  <span>→</span>
                </a>
                <a
                  href="https://discord.gg/6dKrbVQU8W"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-azure hover:underline text-sm pt-1"
                >
                  <span>Join our Discord server</span>
                  <span>↗</span>
                </a>
              </div>
    </nav>
    
  );
}
