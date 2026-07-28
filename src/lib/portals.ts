import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { renderMarkdown } from "./markdown";
import type {
  Portal,
  PortalChangelogEntry,
  PortalDownload,
  PortalFaqItem,
  PortalSupport,
  ProductResource,
} from "@/types/content";

const PORTALS_DIR = path.join(process.cwd(), "content", "portals");

function readResources(raw: unknown): ProductResource[] {
  if (!Array.isArray(raw)) return [];

  return raw
    .map((entry) => {
      if (typeof entry === "string") {
        return { label: path.basename(entry), file: entry };
      }
      if (entry && typeof entry === "object") {
        const e = entry as Record<string, unknown>;
        const file = typeof e.file === "string" ? e.file : "";
        if (!file) return null;
        const label = typeof e.label === "string" ? e.label : path.basename(file);
        return { label, file };
      }
      return null;
    })
    .filter((r): r is ProductResource => r !== null);
}

function readDownload(data: Record<string, unknown>): PortalDownload | null {
  const raw = data.download;
  if (!raw || typeof raw !== "object") return null;

  const d = raw as Record<string, unknown>;
  const file = typeof d.file === "string" && d.file ? d.file : null;
  const url = typeof d.url === "string" && d.url ? d.url : null;
  if (!file && !url) return null;

  const label = typeof d.label === "string" && d.label ? d.label : "Download";
  return { label, file, url };
}

function readFaq(raw: unknown): PortalFaqItem[] {
  if (!Array.isArray(raw)) return [];

  return raw
    .map((entry) => {
      if (!entry || typeof entry !== "object") return null;
      const e = entry as Record<string, unknown>;
      const question = typeof e.question === "string" ? e.question : "";
      const answer = typeof e.answer === "string" ? e.answer : "";
      if (!question || !answer) return null;
      return { question, answer };
    })
    .filter((f): f is PortalFaqItem => f !== null);
}

function readChangelog(raw: unknown): PortalChangelogEntry[] {
  if (!Array.isArray(raw)) return [];

  return raw
    .map((entry) => {
      if (!entry || typeof entry !== "object") return null;
      const e = entry as Record<string, unknown>;
      const version = typeof e.version === "string" ? e.version : "";
      if (!version) return null;
      const date = typeof e.date === "string" ? e.date : "";
      const notes = typeof e.notes === "string" ? e.notes : "";
      return { version, date, notes };
    })
    .filter((c): c is PortalChangelogEntry => c !== null);
}

function readSupport(data: Record<string, unknown>): PortalSupport | null {
  const raw = data.support;
  if (!raw || typeof raw !== "object") return null;

  const s = raw as Record<string, unknown>;
  const message = typeof s.message === "string" ? s.message : "";
  if (!message) return null;

  return {
    message,
    email: typeof s.email === "string" && s.email ? s.email : null,
    link: typeof s.link === "string" && s.link ? s.link : null,
    linkLabel: typeof s.link_label === "string" && s.link_label ? s.link_label : null,
  };
}

function readPortalFile(filename: string): Portal | null {
  const fullPath = path.join(PORTALS_DIR, filename);
  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);

  // A markdown file with no title is treated as a draft/template, not content.
  if (!data.title) return null;

  const slug = (data.slug || filename.replace(/\.md$/, "")).toString();

  return {
    slug,
    title: data.title,
    productTitle: data.product_title || data.productTitle || "",
    welcomeMessage: data.welcome_message || data.welcomeMessage || "",
    download: readDownload(data),
    video: data.video || null,
    faq: readFaq(data.faq),
    resources: readResources(data.resources),
    changelog: readChangelog(data.changelog),
    support: readSupport(data),
    published: data.published !== false,
    contentHtml: renderMarkdown(content),
  };
}

export function getAllPortals(): Portal[] {
  if (!fs.existsSync(PORTALS_DIR)) return [];

  const files = fs.readdirSync(PORTALS_DIR).filter((f) => f.endsWith(".md"));

  return files
    .map(readPortalFile)
    .filter((p): p is Portal => p !== null && p.published);
}

export function getPortalBySlug(slug: string): Portal | null {
  if (!slug) return null;
  return getAllPortals().find((p) => p.slug === slug) || null;
}

export function getAllPortalSlugs(): string[] {
  return getAllPortals().map((p) => p.slug);
}
