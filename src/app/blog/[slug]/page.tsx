import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getAllBlogPosts, getBlogPostBySlug, getRelatedBlogPosts } from "@/data/blogs";
import BlogContent from "@/components/blog/BlogContent";
import BlogTableOfContents from "@/components/blog/BlogTableOfContents";
import BlogCtaBanner from "@/components/blog/BlogCtaBanner";
import BlogFaqSection from "@/components/blog/BlogFaqSection";
import BlogCard from "@/components/blog/BlogCard";
import Footer from "@/components/Footer";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found | OJEE-Tracker Blog",
    };
  }

  const siteUrl = "https://ojeet.tech";
  const postUrl = `${siteUrl}/blog/${post.slug}`;
  const ogImage = post.coverImage.startsWith("http")
    ? post.coverImage
    : `${siteUrl}${post.coverImage}`;

  return {
    title: `${post.title} | OJEE-Tracker`,
    description: post.description,
    keywords: post.tags,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    authors: [{ name: post.author.name }],
    openGraph: {
      title: `${post.title} | OJEE-Tracker`,
      description: post.description,
      url: postUrl,
      siteName: "OJEE-Tracker",
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt || post.publishedAt,
      authors: [post.author.name],
      tags: post.tags,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.coverImageAlt || post.title,
        },
      ],
      locale: "en_IN",
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [ogImage],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedBlogPosts(post.slug, 3);
  const siteUrl = "https://ojeet.tech";
  const postUrl = `${siteUrl}/blog/${post.slug}`;

  // Structured Data (JSON-LD)
  const jsonLdGraph: any[] = [
    {
      "@type": "BlogPosting",
      "@id": `${postUrl}#article`,
      "headline": post.title,
      "description": post.description,
      "datePublished": post.publishedAt,
      "dateModified": post.updatedAt || post.publishedAt,
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": postUrl,
      },
      "author": {
        "@type": "Person",
        "name": post.author.name,
        "jobTitle": post.author.role,
        "url": "https://github.com/Namankatiyar",
      },
      "publisher": {
        "@type": "Organization",
        "name": "OJEE-Tracker",
        "url": siteUrl,
        "logo": {
          "@type": "ImageObject",
          "url": `${siteUrl}/logo.png`,
        },
      },
      "image": post.coverImage.startsWith("http") ? post.coverImage : `${siteUrl}${post.coverImage}`,
      "keywords": post.tags.join(", "),
      "articleSection": post.category,
      "inLanguage": "en-IN",
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${postUrl}#breadcrumb`,
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": siteUrl,
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Blog",
          "item": `${siteUrl}/blog`,
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": post.title,
          "item": postUrl,
        },
      ],
    },
  ];

  if (post.faqs && post.faqs.length > 0) {
    jsonLdGraph.push({
      "@type": "FAQPage",
      "@id": `${postUrl}#faq`,
      "mainEntity": post.faqs.map((faq) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer,
        },
      })),
    });
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": jsonLdGraph,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <div className="flex flex-1 flex-col bg-background text-foreground selection:bg-azure selection:text-white font-sans min-h-screen">
        {/* Article Header & Hero */}
        <header className="border-b border-subtle-border bg-gradient-to-b from-foreground/[0.02] to-transparent py-12 sm:py-16">
          <div className="max-w-4xl mx-auto px-6 flex flex-col gap-6">
            {/* Breadcrumb Navigation */}
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-muted-text">
              <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
              <span>/</span>
              <Link href="/blog" className="hover:text-foreground transition-colors">Blog</Link>
              <span>/</span>
              <span className="text-azure font-medium truncate max-w-[200px] sm:max-w-xs">{post.title}</span>
            </nav>

            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="rounded-full bg-azure/10 border border-azure/30 px-3 py-1 text-xs font-semibold text-azure uppercase tracking-wider">
                {post.category}
              </span>
              <span className="rounded-full bg-foreground/5 border border-subtle-border px-3 py-1 text-xs font-mono font-medium text-foreground/80">
                {post.targetExam}
              </span>
              <span className="text-xs text-muted-text-strong font-mono">
                {post.readingTime}
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground leading-[1.12]">
              {post.title}
            </h1>

            {/* Sub-headline description */}
            <p className="text-base sm:text-lg text-muted-text leading-relaxed">
              {post.description}
            </p>

            {/* Author Row & Publish Date */}
            <div className="pt-4 border-t border-subtle-border flex items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-azure/20 border border-azure/40 flex items-center justify-center font-bold text-sm text-azure font-mono">
                  {post.author.name.charAt(0)}
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-foreground text-sm">{post.author.name}</span>
                  <span className="text-muted-text">{post.author.role}</span>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <time dateTime={post.publishedAt} className="text-muted-text font-mono">
                  {new Date(post.publishedAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </time>
              </div>
            </div>
          </div>
        </header>

        {/* Article Body + Sticky Sidebar Layout */}
        <main className="max-w-7xl w-full mx-auto px-6 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Main Article Content Column (8 cols on lg) */}
            <div className="lg:col-span-8 flex flex-col">
              {/* Cover Image */}
              {post.coverImage && (
                <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-subtle-border bg-card-bg mb-10 shadow-lg">
                  <Image
                    src={post.coverImage}
                    alt={post.coverImageAlt || post.title}
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 800px"
                  />
                </div>
              )}

              {/* Rendered Markdown Body */}
              <BlogContent content={post.content} />

              {/* In-Article CTA Banner */}
              <BlogCtaBanner />

              {/* FAQ Accordion */}
              {post.faqs && post.faqs.length > 0 && (
                <BlogFaqSection faqs={post.faqs} />
              )}

              {/* Tags List */}
              <div className="my-8 pt-6 border-t border-subtle-border flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold text-muted-text-strong uppercase tracking-wider mr-2">
                  Keywords & Tags:
                </span>
                {post.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded bg-foreground/5 border border-subtle-border text-xs text-muted-text font-mono"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Sidebar Column (4 cols on lg) */}
            <aside className="lg:col-span-4 flex flex-col gap-8 ">
              {/* Table of Contents */}
              <BlogTableOfContents items={post.tableOfContents} />
            </aside>
          </div>

          {/* Related Articles Section */}
          {relatedPosts.length > 0 && (
            <section className="mt-20 pt-12 border-t border-subtle-border flex flex-col gap-8">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-azure font-mono">
                    Keep Reading
                  </span>
                  <h2 className="font-display text-2xl font-bold tracking-tight text-foreground mt-1">
                    Related Preparation Blueprints
                  </h2>
                </div>
                <Link href="/blog" className="text-xs font-semibold text-azure hover:underline">
                  View all guides →
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((rPost) => (
                  <BlogCard key={rPost.slug} post={rPost} />
                ))}
              </div>
            </section>
          )}
        </main>

        <Footer />
      </div>
    </>
  );
}
