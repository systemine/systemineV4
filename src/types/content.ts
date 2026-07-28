export interface ProductResource {
  label: string;
  file: string;
}

export interface Product {
  slug: string;
  title: string;
  price: string;
  category: string;
  cover: string | null;
  gallery: string[];
  video: string | null;
  resources: ProductResource[];
  tags: string[];
  featured: boolean;
  published: boolean;
  purchaseUrl: string;
  portalSlug: string | null;
  description: string;
  contentHtml: string;
}

export interface Article {
  slug: string;
  title: string;
  date: string;
  author: string;
  excerpt: string;
  cover: string | null;
  video: string | null;
  tags: string[];
  published: boolean;
  contentHtml: string;
}

export interface Shelf {
  category: string;
  products: Product[];
}

export interface PortalFaqItem {
  question: string;
  answer: string;
}

export interface PortalChangelogEntry {
  version: string;
  date: string;
  notes: string;
}

export interface PortalSupport {
  message: string;
  email: string | null;
  link: string | null;
  linkLabel: string | null;
}

export interface PortalDownload {
  label: string;
  file: string | null;
  url: string | null;
}

export interface Portal {
  slug: string;
  title: string;
  productTitle: string;
  welcomeMessage: string;
  download: PortalDownload | null;
  video: string | null;
  faq: PortalFaqItem[];
  resources: ProductResource[];
  changelog: PortalChangelogEntry[];
  support: PortalSupport | null;
  published: boolean;
  contentHtml: string;
}
