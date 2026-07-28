import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { renderMarkdown } from "./markdown";
import type { Article } from "@/types/content";

const ARTICLES_DIR = path.join(process.cwd(), "content", "articles");

function readArticleFile(filename: string): Article | null {
  const fullPath = path.join(ARTICLES_DIR, filename);
  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);

  if (!data.title) return null;

  const slug = (data.slug || filename.replace(/\.md$/, "")).toString();

  return {
    slug,
    title: data.title,
    date: data.date ? String(data.date) : "",
    author: data.author || "Systemine",
    excerpt: data.excerpt || "",
    cover: data.cover || null,
    video: data.video || null,
    tags: Array.isArray(data.tags) ? data.tags : [],
    published: data.published !== false,
    contentHtml: renderMarkdown(content),
  };
}

export function getAllArticles(): Article[] {
  if (!fs.existsSync(ARTICLES_DIR)) return [];

  const files = fs.readdirSync(ARTICLES_DIR).filter((f) => f.endsWith(".md"));

  const articles = files
    .map(readArticleFile)
    .filter((a): a is Article => a !== null && a.published);

  return articles.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getArticleBySlug(slug: string): Article | null {
  return getAllArticles().find((a) => a.slug === slug) || null;
}

export function getAllArticleSlugs(): string[] {
  return getAllArticles().map((a) => a.slug);
}
