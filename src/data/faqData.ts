export interface FaqItem {
  id: string;
  category: "General" | "Syllabus & Features" | "Privacy & Offline" | "Pricing & Open Source";
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: "free-and-ad-free",
    category: "Pricing & Open Source",
    question: "Is OJEE-Tracker really 100% free and completely ad-free?",
    answer:
      "Yes! OJEE-Tracker offers a 100% completely ad-free experience forever. There are zero banner ads, video popups, sponsored coaching promotions, or user tracking cookies. Every core tool—including the subtopic syllabus planner, study time tracker, mock score tracker, and peer accountability network—is unrestricted and completely free at ₹0."
  },
  {
    id: "prep-tracker-jee-neet",
    category: "Syllabus & Features",
    question: "How does OJEE-Tracker work as a preparation and prep tracker for JEE and NEET students?",
    answer:
      "OJEE-Tracker is an all-in-one preparation tracker that combines four vital study systems: (1) a granular syllabus planner that breaks chapters into subtopics, (2) an integrated deep work time tracker with Pomodoro and stopwatch modes, (3) a mock score tracker that records test series trends, and (4) a live peer accountability network. Everything runs offline-first with zero lag."
  },
  {
    id: "syllabus-planner-subtopics",
    category: "Syllabus & Features",
    question: "How does the syllabus planner organize JEE and NEET topics down to subtopics?",
    answer:
      "Unlike generic checklist apps that only list broad chapter names, OJEE-Tracker breaks each chapter down into specific conceptual subtopics (e.g., in Rotational Dynamics: Moment of Inertia, Angular Momentum, Pure Rolling). For every subtopic, you can independently tick off 4 key milestones: NCERT theory reading, Previous Year Questions (PYQs), coaching modules, and chapter mock tests."
  },
  {
    id: "time-tracker-study-clock",
    category: "Syllabus & Features",
    question: "How does the study time tracker help JEE and NEET students maintain focus?",
    answer:
      "The built-in time tracker features both 25-minute Pomodoro cycles and a continuous deep work stopwatch. Sessions are tagged by subject (Physics, Chemistry, Mathematics, Biology) and automatically aggregated into daily study hours reports. Because OJEE-Tracker is completely ad-free, your focus is never interrupted by intrusive ads or popups."
  },
  {
    id: "mock-score-tracker",
    category: "Syllabus & Features",
    question: "How does the mock score tracker record test performance for JEE and NEET?",
    answer:
      "The mock score tracker acts as a dedicated test series ledger. You can log test titles, dates, and scores out of 300 marks (JEE Main), 360 marks (JEE Advanced), or 720 marks (NEET). It helps you visualize accuracy trends, identify weak subjects, and track your trajectory toward your target cutoff percentile."
  },
  {
    id: "offline-support",
    category: "Privacy & Offline",
    question: "Does OJEE-Tracker work offline without an active internet connection?",
    answer:
      "Yes! OJEE-Tracker is architected offline-first. All your syllabus ticks, study time tracker logs, revision stages, and mock test scores are saved locally in your browser storage (IndexedDB / LocalStorage). You can continue studying and tracking smoothly during internet outages or in airplane mode."
  },
  {
    id: "exams-covered",
    category: "Syllabus & Features",
    question: "Which competitive exams and syllabi are supported?",
    answer:
      "OJEE-Tracker comes pre-loaded with official, up-to-date syllabi for JEE Main, JEE Advanced, NEET UG, and Odisha JEE (OJEE). It covers Physics, Chemistry, Mathematics, and Biology (Botany & Zoology), all aligned with the latest NTA and exam board guidelines."
  },
  {
    id: "data-privacy",
    category: "Privacy & Offline",
    question: "Is my personal study data and test performance kept private?",
    answer:
      "Absolutely. Because OJEE-Tracker operates on an offline-first architecture, your preparation logs, test scores, and study hours remain directly on your local device. We never sell your study habits to coaching institutes or third-party advertisers. Only peer metrics you explicitly choose to share with your study group are synced."
  },
  {
    id: "notion-excel-alternative",
    category: "General",
    question: "Why should I choose OJEE-Tracker over Notion templates or Excel sheets?",
    answer:
      "Notion and Excel spreadsheets require hours of tedious manual setup, feel clunky and slow on mobile, lack an integrated study time tracker tied to subjects, and have no built-in mock test score analysis. OJEE-Tracker is purpose-built for JEE and NEET: open the app, pick your exam, and immediately start tracking your preparation with zero setup."
  },
  {
    id: "pwa-mobile-install",
    category: "General",
    question: "Can I install OJEE-Tracker on Android, iOS, or Windows as an app?",
    answer:
      "Yes. OJEE-Tracker is a Progressive Web App (PWA). You can open it in any modern browser (Chrome, Safari, Edge, Firefox) and select 'Install' or 'Add to Home Screen' to launch it as a dedicated, fullscreen standalone app on your phone, tablet, or PC with instant startup and zero installation bloat."
  }
];
