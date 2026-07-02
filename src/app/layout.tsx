import type { Metadata } from "next";
import { Geist, Outfit } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "OJEE-Tracker | Premium JEE & OJEE Study Command Centre",
  description: "Track syllabus, analyze progress, log study hours, and connect with peers. An offline-first study command center built for JEE & OJEE aspirants.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${outfit.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}{/* impeccable-live-start */}
<script async src="http://localhost:8401/live.js"></script>
{/* impeccable-live-end */}
</body>
    </html>
  );
}
