import { BlogPost, BlogCategory } from "@/types/blog";
import { subtopicChecklistJeeNeet } from "./subtopic-checklist-jee-neet";
import { mockTestAnalysisFramework } from "./mock-test-analysis-framework";
import { clearClass11BacklogStrategy } from "./clear-class-11-backlog-strategy";
import { last60DaysRevisionProtocol } from "./last-60-days-revision-protocol";
import { notionExcelVsStudyTracker } from "./notion-excel-vs-study-tracker";
import { deepWorkPomodoroStudyRoutine } from "./deep-work-pomodoro-study-routine";
import { adFreeOfflineStudyTools } from "./ad-free-offline-study-tools";
import { organicChemistryMasteryRoadmap } from "./organic-chemistry-mastery-roadmap";
import { peerAccountabilityWithoutDistraction } from "./peer-accountability-without-distraction";
import { jeeNeetSubjectBalanceFormula } from "./jee-neet-subject-balance-formula";

// Complete Registry of all 10 published blog posts
export const ALL_BLOG_POSTS: BlogPost[] = [
  subtopicChecklistJeeNeet,
  mockTestAnalysisFramework,
  clearClass11BacklogStrategy,
  last60DaysRevisionProtocol,
  notionExcelVsStudyTracker,
  deepWorkPomodoroStudyRoutine,
  adFreeOfflineStudyTools,
  organicChemistryMasteryRoadmap,
  peerAccountabilityWithoutDistraction,
  jeeNeetSubjectBalanceFormula,
];

export function getAllBlogPosts(): BlogPost[] {
  return [...ALL_BLOG_POSTS].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return ALL_BLOG_POSTS.find((post) => post.slug === slug);
}

export function getFeaturedBlogPosts(): BlogPost[] {
  return getAllBlogPosts().filter((post) => post.featured);
}

export function getRelatedBlogPosts(currentSlug: string, count: number = 3): BlogPost[] {
  const current = getBlogPostBySlug(currentSlug);
  if (!current) return getAllBlogPosts().slice(0, count);

  return getAllBlogPosts()
    .filter((post) => post.slug !== currentSlug)
    .sort((a, b) => {
      // Prioritize same category, then same target exam
      let scoreA = 0;
      let scoreB = 0;
      if (a.category === current.category) scoreA += 2;
      if (b.category === current.category) scoreB += 2;
      if (a.targetExam === current.targetExam) scoreA += 1;
      if (b.targetExam === current.targetExam) scoreB += 1;
      return scoreB - scoreA;
    })
    .slice(0, count);
}

export function getAllCategories(): BlogCategory[] {
  return [
    "Strategy & Planning",
    "Deep Work & Focus",
    "Mock Tests & Analysis",
    "Subject Mastery",
    "Mindset & Accountability",
  ];
}
