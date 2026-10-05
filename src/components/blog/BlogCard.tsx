import React from "react";
import Link from "next/link";
import Image from "next/image";
import { BlogPost } from "@/types/blog";

const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
  "Strategy & Planning": { bg: "bg-azure/10", text: "text-azure", border: "border-azure/30" },
  "Deep Work & Focus": { bg: "bg-purple-500/10", text: "text-purple-400", border: "border-purple-500/30" },
  "Mock Tests & Analysis": { bg: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-500/30" },
  "Subject Mastery": { bg: "bg-amber-500/10", text: "text-amber-400", border: "border-amber-500/30" },
  "Mindset & Accountability": { bg: "bg-pink-500/10", text: "text-pink-400", border: "border-pink-500/30" },
};

export default function BlogCard({ post }: { post: BlogPost }) {
  const color = categoryColors[post.category] || categoryColors["Strategy & Planning"];

  return (
    <article className="group flex flex-col justify-between rounded-2xl border border-subtle-border bg-card-bg p-5 sm:p-6 transition-all duration-300 hover:border-azure/40 hover:-translate-y-1 hover:shadow-xl hover:shadow-azure/5">
      <div className="flex flex-col gap-4">
        {/* Post Cover or Thematic Visual Container */}
        <Link href={`/blog/${post.slug}`} className="block relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-foreground/5 border border-subtle-border">
          {post.coverImage ? (
            <Image
              src={post.coverImage}
              alt={post.coverImageAlt || post.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center p-6 bg-gradient-to-br from-foreground/[0.04] to-foreground/[0.01]">
              <span className="font-display font-bold text-xl text-azure opacity-80 text-center">
                {post.category}
              </span>
            </div>
          )}

          {/* Target Exam Tag Overlay */}
          <div className="absolute top-3 left-3">
            <span className="rounded-full bg-background/80 backdrop-blur-md px-2.5 py-0.5 text-[10px] font-mono font-semibold uppercase tracking-wider text-foreground border border-subtle-border">
              {post.targetExam}
            </span>
          </div>
        </Link>

        {/* Metadata Row */}
        <div className="flex items-center justify-between text-xs">
          <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider border ${color.bg} ${color.text} ${color.border}`}>
            {post.category}
          </span>
          <span className="text-muted-text-strong font-mono text-[11px]">
            {post.readingTime}
          </span>
        </div>

        {/* Title & Excerpt */}
        <div className="flex flex-col gap-2">
          <Link href={`/blog/${post.slug}`}>
            <h3 className="font-display text-lg sm:text-xl font-bold tracking-tight text-foreground transition-colors group-hover:text-azure line-clamp-2">
              {post.title}
            </h3>
          </Link>
          <p className="text-xs sm:text-sm text-muted-text line-clamp-3 leading-relaxed">
            {post.description}
          </p>
        </div>
      </div>

      {/* Author & Read More Footer */}
      <div className="mt-6 pt-4 border-t border-subtle-border flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-azure/20 border border-azure/40 flex items-center justify-center font-bold text-[10px] text-azure font-mono">
            {post.author.name.charAt(0)}
          </div>
          <span className="text-muted-text font-medium">{post.author.name}</span>
        </div>
        <Link
          href={`/blog/${post.slug}`}
          className="text-azure font-semibold hover:underline inline-flex items-center gap-1 group/btn"
        >
          <span>Read guide</span>
          <span className="transition-transform group-hover/btn:translate-x-0.5">→</span>
        </Link>
      </div>
    </article>
  );
}
