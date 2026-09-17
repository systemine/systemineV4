import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { renderMarkdown } from "./markdown";
import type { FreeResource } from "@/types/content";

const FREE_RESOURCES_DIR = path.join(
  process.cwd(),
  "content",
  "free-resources"
);

function readFreeResourceFile(filename: string): FreeResource | null {
  const fullPath = path.join(FREE_RESOURCES_DIR, filename);
  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);

  if (!data.title) return null;

  const slug = (data.slug || filename.replace(/\.md$/, "")).toString();

  return {
  slug,
  title: data.title,
  description: data.description || "",
  category: data.category || "",
  cover: data.cover || null,
  tags: Array.isArray(data.tags) ? data.tags : [],
  featured: Boolean(data.featured),
  published: data.published !== false,
  kitFormId: data.kit_form_id || "",
  resourceUrl: data.resource_url || "",
  resourceLabel: data.resource_label || "Open the resource",
  contentHtml: renderMarkdown(content),
};
}

export function getAllFreeResources(): FreeResource[] {
  if (!fs.existsSync(FREE_RESOURCES_DIR)) return [];

  const files = fs
    .readdirSync(FREE_RESOURCES_DIR)
    .filter((f) => f.endsWith(".md") && !f.startsWith("_"));

  return files
    .map(readFreeResourceFile)
    .filter(
      (resource): resource is FreeResource =>
        resource !== null && resource.published
    );
}

export function getFeaturedFreeResources(): FreeResource[] {
  return getAllFreeResources().filter((resource) => resource.featured);
}

export function getFreeResourceBySlug(
  slug: string
): FreeResource | null {
  return getAllFreeResources().find(
    (resource) => resource.slug === slug
  ) || null;
}

export function getAllFreeResourceSlugs(): string[] {
  return getAllFreeResources().map((resource) => resource.slug);
}