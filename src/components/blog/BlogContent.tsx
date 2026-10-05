import React from "react";
import Link from "next/link";
import Image from "next/image";

interface BlogContentProps {
  content: string;
}

export default function BlogContent({ content }: BlogContentProps) {
  // Simple, robust line-by-line / block parser to avoid external heavy dependencies
  const renderMarkdown = (text: string) => {
    const lines = text.split("\n");
    const elements: React.ReactNode[] = [];
    let i = 0;

    const parseInline = (inlineText: string): React.ReactNode => {
      // Parse links: [label](url)
      const parts: React.ReactNode[] = [];
      const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
      let lastIndex = 0;
      let match;

      while ((match = linkRegex.exec(inlineText)) !== null) {
        if (match.index > lastIndex) {
          parts.push(parseFormattedText(inlineText.substring(lastIndex, match.index)));
        }
        const label = match[1];
        const href = match[2];
        const isExternal = href.startsWith("http");

        if (isExternal) {
          parts.push(
            <a
              key={match.index}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-azure underline underline-offset-2 hover:opacity-80 font-medium"
            >
              {label}
            </a>
          );
        } else {
          parts.push(
            <Link
              key={match.index}
              href={href}
              className="text-azure underline underline-offset-2 hover:opacity-80 font-medium"
            >
              {label}
            </Link>
          );
        }
        lastIndex = match.index + match[0].length;
      }

      if (lastIndex < inlineText.length) {
        parts.push(parseFormattedText(inlineText.substring(lastIndex)));
      }

      return parts.length > 0 ? parts : parseFormattedText(inlineText);
    };

    const parseFormattedText = (rawText: string): React.ReactNode => {
      // Split on bold (`**`) and code (` ` `)
      const tokens: React.ReactNode[] = [];
      // Regex for **bold** or `code`
      const tokenRegex = /(\*\*([^*]+)\*\*|`([^`]+)`)/g;
      let lastIdx = 0;
      let m;

      while ((m = tokenRegex.exec(rawText)) !== null) {
        if (m.index > lastIdx) {
          tokens.push(rawText.substring(lastIdx, m.index));
        }
        if (m[2]) {
          // Bold
          tokens.push(<strong key={m.index} className="font-semibold text-foreground">{m[2]}</strong>);
        } else if (m[3]) {
          // Code
          tokens.push(
            <code
              key={m.index}
              className="px-1.5 py-0.5 rounded bg-foreground/10 text-azure font-mono text-[0.85em] border border-subtle-border"
            >
              {m[3]}
            </code>
          );
        }
        lastIdx = m.index + m[0].length;
      }

      if (lastIdx < rawText.length) {
        tokens.push(rawText.substring(lastIdx));
      }

      return tokens.length > 0 ? tokens : rawText;
    };

    while (i < lines.length) {
      const line = lines[i];

      // Empty line
      if (!line.trim()) {
        i++;
        continue;
      }

      // Check for Custom Callout / Alert Box: > [!NOTE], > [!TIP], > [!IMPORTANT], > [!WARNING]
      if (line.startsWith("> [!")) {
        const typeMatch = line.match(/^> \[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]/i);
        const alertType = typeMatch ? typeMatch[1].toUpperCase() : "NOTE";
        const alertLines: string[] = [];
        i++;
        while (i < lines.length && lines[i].startsWith(">")) {
          alertLines.push(lines[i].replace(/^>\s?/, ""));
          i++;
        }

        const borderColors: Record<string, string> = {
          NOTE: "border-blue-500/40 bg-blue-500/5 text-blue-200",
          TIP: "border-emerald-500/40 bg-emerald-500/5 text-emerald-200",
          IMPORTANT: "border-purple-500/40 bg-purple-500/5 text-purple-200",
          WARNING: "border-amber-500/40 bg-amber-500/5 text-amber-200",
          CAUTION: "border-rose-500/40 bg-rose-500/5 text-rose-200",
        };

        const titleColors: Record<string, string> = {
          NOTE: "text-blue-400",
          TIP: "text-emerald-400",
          IMPORTANT: "text-purple-400",
          WARNING: "text-amber-400",
          CAUTION: "text-rose-400",
        };

        elements.push(
          <div
            key={`alert-${i}`}
            className={`my-6 rounded-xl border p-4.5 text-sm ${borderColors[alertType] || borderColors.NOTE}`}
          >
            <div className={`font-mono text-xs font-bold uppercase tracking-wider mb-1.5 ${titleColors[alertType] || titleColors.NOTE}`}>
              {alertType}
            </div>
            <div className="text-muted-text space-y-2 leading-relaxed">
              {alertLines.map((al, idx) => (
                <p key={idx}>{parseInline(al)}</p>
              ))}
            </div>
          </div>
        );
        continue;
      }

      // Standard Blockquote
      if (line.startsWith("> ")) {
        const quoteLines: string[] = [];
        while (i < lines.length && lines[i].startsWith(">")) {
          quoteLines.push(lines[i].replace(/^>\s?/, ""));
          i++;
        }
        elements.push(
          <blockquote
            key={`quote-${i}`}
            className="my-6 border-l-4 border-azure/80 pl-4 py-1 italic text-muted-text bg-foreground/[0.02] rounded-r-lg"
          >
            {quoteLines.map((ql, idx) => (
              <p key={idx} className="mb-1 last:mb-0 leading-relaxed">
                {parseInline(ql)}
              </p>
            ))}
          </blockquote>
        );
        continue;
      }

      // Markdown Table
      if (line.startsWith("|") && line.endsWith("|")) {
        const tableLines: string[] = [];
        while (i < lines.length && lines[i].startsWith("|") && lines[i].endsWith("|")) {
          tableLines.push(lines[i]);
          i++;
        }

        if (tableLines.length >= 2) {
          const parseRow = (rowStr: string) =>
            rowStr
              .split("|")
              .slice(1, -1)
              .map((c) => c.trim());

          const headerRow = parseRow(tableLines[0]);
          const bodyRows = tableLines.slice(2).map(parseRow);

          elements.push(
            <div key={`table-${i}`} className="my-8 overflow-x-auto rounded-xl border border-subtle-border bg-card-bg">
              <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[500px]">
                <thead>
                  <tr className="border-b border-subtle-border bg-foreground/[0.04]">
                    {headerRow.map((h, hIdx) => (
                      <th key={hIdx} className="py-3 px-4 font-semibold text-foreground uppercase tracking-wider text-[11px]">
                        {parseInline(h)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-subtle-border/50">
                  {bodyRows.map((row, rIdx) => (
                    <tr key={rIdx} className="hover:bg-foreground/[0.02] transition-colors">
                      {row.map((cell, cIdx) => (
                        <td key={cIdx} className="py-3 px-4 text-muted-text">
                          {parseInline(cell)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
          continue;
        }
      }

      // Code block
      if (line.startsWith("```")) {
        const codeLines: string[] = [];
        i++; // skip opening ```
        while (i < lines.length && !lines[i].startsWith("```")) {
          codeLines.push(lines[i]);
          i++;
        }
        if (i < lines.length) i++; // skip closing ```
        elements.push(
          <div key={`code-${i}`} className="my-6 rounded-xl border border-subtle-border bg-card-bg p-4 overflow-x-auto">
            <pre className="font-mono text-xs sm:text-sm text-foreground/90 leading-relaxed">
              <code>{codeLines.join("\n")}</code>
            </pre>
          </div>
        );
        continue;
      }

      // Headings
      if (line.startsWith("#### ")) {
        const headingText = line.replace("#### ", "").trim();
        const id = headingText.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
        elements.push(
          <h4 key={`h4-${i}`} id={id} className="font-display text-lg font-bold text-foreground mt-8 mb-3 scroll-mt-24">
            {parseInline(headingText)}
          </h4>
        );
        i++;
        continue;
      }

      if (line.startsWith("### ")) {
        const headingText = line.replace("### ", "").trim();
        const id = headingText.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
        elements.push(
          <h3 key={`h3-${i}`} id={id} className="font-display text-xl sm:text-2xl font-bold text-foreground mt-10 mb-4 scroll-mt-24">
            {parseInline(headingText)}
          </h3>
        );
        i++;
        continue;
      }

      if (line.startsWith("## ")) {
        const headingText = line.replace("## ", "").trim();
        const id = headingText.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
        elements.push(
          <h2
            key={`h2-${i}`}
            id={id}
            className="font-display text-2xl sm:text-3xl font-extrabold text-foreground mt-12 mb-5 pb-2 border-b border-subtle-border scroll-mt-24 flex items-center justify-between"
          >
            <span>{parseInline(headingText)}</span>
            <a href={`#${id}`} className="text-muted-text-strong hover:text-azure text-base transition-colors opacity-0 hover:opacity-100 sm:opacity-40">
              #
            </a>
          </h2>
        );
        i++;
        continue;
      }

      // Unordered Lists (- or *)
      if (line.startsWith("- ") || line.startsWith("* ")) {
        const listItems: string[] = [];
        while (i < lines.length && (lines[i].startsWith("- ") || lines[i].startsWith("* "))) {
          listItems.push(lines[i].substring(2));
          i++;
        }
        elements.push(
          <ul key={`ul-${i}`} className="my-5 list-disc pl-6 space-y-2 text-muted-text text-base leading-relaxed">
            {listItems.map((item, idx) => (
              <li key={idx} className="marker:text-azure">
                {parseInline(item)}
              </li>
            ))}
          </ul>
        );
        continue;
      }

      // Ordered Lists (1. 2.)
      if (/^\d+\.\s/.test(line)) {
        const listItems: string[] = [];
        while (i < lines.length && /^\d+\.\s/.test(lines[i])) {
          listItems.push(lines[i].replace(/^\d+\.\s/, ""));
          i++;
        }
        elements.push(
          <ol key={`ol-${i}`} className="my-5 list-decimal pl-6 space-y-2 text-muted-text text-base leading-relaxed">
            {listItems.map((item, idx) => (
              <li key={idx} className="marker:text-azure marker:font-semibold">
                {parseInline(item)}
              </li>
            ))}
          </ol>
        );
        continue;
      }

      // Check for standalone image: ![alt](url)
      const imgMatch = line.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
      if (imgMatch) {
        const alt = imgMatch[1];
        const src = imgMatch[2];
        elements.push(
          <figure key={`img-${i}`} className="my-8 flex flex-col items-center">
            <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden border border-subtle-border bg-card-bg">
              <Image
                src={src}
                alt={alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 800px"
              />
            </div>
            {alt && (
              <figcaption className="text-xs text-muted-text-strong mt-2 text-center">
                {alt}
              </figcaption>
            )}
          </figure>
        );
        i++;
        continue;
      }

      // Default paragraph
      elements.push(
        <p key={`p-${i}`} className="my-4 text-base sm:text-lg text-muted-text leading-relaxed font-normal">
          {parseInline(line)}
        </p>
      );
      i++;
    }

    return elements;
  };

  return (
    <article className="prose prose-invert max-w-none">
      {renderMarkdown(content)}
    </article>
  );
}
