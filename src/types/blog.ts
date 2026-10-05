export interface TableOfContentsItem {
  id: string;
  title: string;
  level: number;
}

export interface BlogFaqItem {
  question: string;
  answer: string;
}

export interface BlogAuthor {
  name: string;
  role: string;
  avatar?: string;
  bio?: string;
}

export type BlogCategory =
  | "Strategy & Planning"
  | "Deep Work & Focus"
  | "Mock Tests & Analysis"
  | "Subject Mastery"
  | "Mindset & Accountability";

export type TargetExam =
  | "JEE & NEET"
  | "JEE Main & Advanced"
  | "NEET UG"
  | "All Aspirants";

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  publishedAt: string; // YYYY-MM-DD
  updatedAt?: string;
  author: BlogAuthor;
  readingTime: string;
  category: BlogCategory;
  tags: string[];
  targetExam: TargetExam;
  coverImage: string;
  coverImageAlt: string;
  tableOfContents: TableOfContentsItem[];
  content: string; // Markdown / structured article body
  faqs?: BlogFaqItem[];
  featured?: boolean;
}
