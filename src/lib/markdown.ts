import { marked } from "marked";

marked.setOptions({
  gfm: true,
  breaks: false,
});

// Inline markdown images (`![alt](/path.jpg)`) are made responsive and
// lazy-loaded after rendering, so nobody writing an article has to
// think about sizing. This runs on the server, once, at build time.
function makeImagesResponsive(html: string): string {
  return html.replace(/<img /g, '<img loading="lazy" decoding="async" ');
}

/**
 * Turns a markdown string into sanitized-by-convention HTML.
 * Content is authored by the site owner only (via markdown files in
 * the repo), so this intentionally does not run through a client-side
 * sanitizer — treat /content as trusted, first-party content.
 */
export function renderMarkdown(markdown: string): string {
  if (!markdown) return "";
  const html = marked.parse(markdown, { async: false }) as string;
  return makeImagesResponsive(html);
}
