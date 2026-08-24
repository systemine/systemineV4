import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { renderMarkdown } from "./markdown";
import { CATEGORY_ORDER } from "./constants";
import type { Product, ProductResource, Shelf } from "@/types/content";

const PRODUCTS_DIR = path.join(process.cwd(), "content", "products");

function readResources(data: Record<string, unknown>): ProductResource[] {
  const raw = data.resources;
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

function readProductFile(filename: string): Product | null {
  const fullPath = path.join(PRODUCTS_DIR, filename);
  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);

  // A markdown file with no title is treated as a draft/template, not content.
  if (!data.title) return null;

  const slug = (data.slug || filename.replace(/\.md$/, "")).toString();

  return {
    slug,
    title: data.title,
    price: data.price ? String(data.price) : "",
    categories: Array.isArray(data.categories)
    ? data.categories
    : data.category
    ? [data.category]
    : ["Uncategorized"],
    cover: data.cover || data.image || null,
    gallery: Array.isArray(data.gallery) ? data.gallery : [],
    video: data.video || null,
    resources: readResources(data),
    tags: Array.isArray(data.tags) ? data.tags : [],
    featured: Boolean(data.featured),
    published: data.published !== false,
    purchaseUrl: data.purchase_url || data.purchaseUrl || "",
    purchaseUrlIndia: data.purchase_url_india || "",
    portalSlug: data.portal_slug || data.portalSlug || null,
    description: data.description || "",
    contentHtml: renderMarkdown(content),
  };
}

export function getAllProducts(): Product[] {
  if (!fs.existsSync(PRODUCTS_DIR)) return [];

  const files = fs.readdirSync(PRODUCTS_DIR).filter((f) => f.endsWith(".md"));

  const products = files
    .map(readProductFile)
    .filter((p): p is Product => p !== null && p.published);

  return products.sort((a, b) => a.title.localeCompare(b.title));
}

export function getFeaturedProducts(): Product[] {
  return getAllProducts().filter((p) => p.featured);
}

export function getProductBySlug(slug: string): Product | null {
  return getAllProducts().find((p) => p.slug === slug) || null;
}

export function getAllProductSlugs(): string[] {
  return getAllProducts().map((p) => p.slug);
}

/**
 * Groups published products into shelves (categories), ordered
 * first by the curated CATEGORY_ORDER list, then alphabetically
 * for anything new that hasn't been slotted in yet.
 */
export function getShelves(): Shelf[] {
  const products = getAllProducts();
  const byCategory = new Map<string, Product[]>();

  for (const product of products) {
    for (const category of product.categories) {
      const list = byCategory.get(category) || [];
      list.push(product);
      byCategory.set(category, list);
    }
  }

  const known = CATEGORY_ORDER;

  const unknown = [...byCategory.keys()]
    .filter((c) => !CATEGORY_ORDER.includes(c))
    .sort((a, b) => a.localeCompare(b));

  return [...known, ...unknown].map((category) => ({
    category,
    products: byCategory.get(category) || [],
  }));
}
