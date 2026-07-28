import type { MetadataRoute } from "next";
import { getAllProducts } from "@/lib/products";
import { getAllArticles } from "@/lib/articles";
import { SITE } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/shelves",
    "/articles",
    "/about",
    "/newsletter",
    "/contact",
    "/privacy",
    "/terms",
    "/refund-policy",
  ].map((route) => ({
    url: `${SITE.url}${route}`,
    lastModified: new Date(),
  }));

  const productRoutes = getAllProducts().map((product) => ({
    url: `${SITE.url}/shelves/${product.slug}`,
    lastModified: new Date(),
  }));

  const articleRoutes = getAllArticles().map((article) => ({
    url: `${SITE.url}/articles/${article.slug}`,
    lastModified: article.date ? new Date(article.date) : new Date(),
  }));

  return [...staticRoutes, ...productRoutes, ...articleRoutes];
}
