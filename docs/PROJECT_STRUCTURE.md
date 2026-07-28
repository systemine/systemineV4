# Project Structure

A map of where things live. You'll spend almost all of your time in
the folders marked **← you'll use this a lot**.

```
systemine/
│
├── content/                          ← you'll use this a lot
│   ├── products/
│   │   ├── _template.md              (copy this to make a new product)
│   │   └── your-product.md
│   ├── articles/
│   │   ├── _template.md              (copy this to make a new article)
│   │   └── your-article.md
│   └── portals/
│       ├── _template.md              (copy this to make a new download portal)
│       └── your-portal.md
│
├── public/                           ← you'll use this a lot
│   ├── images/
│   │   ├── brand/                    logo + hero cover artwork
│   │   ├── products/<slug>/          one folder per product's images
│   │   ├── articles/<slug>/          one folder per article's images
│   │   └── portals/<slug>/           one folder per portal's images (optional)
│   ├── files/<slug>/                 downloadable resources for products and portals
│   └── audio/
│       └── ambience.mp3              the background flute loop
│
├── docs/                             this documentation
│   ├── CONTENT_GUIDE.md
│   ├── PORTAL_GUIDE.md
│   ├── DEPLOYMENT.md
│   └── PROJECT_STRUCTURE.md
│
├── src/
│   ├── app/                          one folder per page/URL
│   │   ├── page.tsx                  Homepage
│   │   ├── layout.tsx                Wraps every page (header, footer, fonts)
│   │   ├── globals.css               Colors, fonts, and shared styling
│   │   ├── shelves/
│   │   │   ├── page.tsx              /shelves — the product library
│   │   │   └── [slug]/page.tsx       /shelves/anything — one product page
│   │   ├── articles/
│   │   │   ├── page.tsx              /articles — the article list
│   │   │   └── [slug]/page.tsx       /articles/anything — one article page
│   │   ├── portals/
│   │   │   └── [slug]/page.tsx       /portals/anything — one download portal page
│   │   ├── about/page.tsx
│   │   ├── newsletter/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── privacy/page.tsx
│   │   ├── terms/page.tsx
│   │   ├── refund-policy/page.tsx
│   │   ├── not-found.tsx             The 404 page
│   │   ├── sitemap.ts                Auto-generated sitemap.xml
│   │   └── robots.ts                 Auto-generated robots.txt
│   │
│   ├── components/                   Reusable pieces of UI
│   │   ├── Header.tsx / Footer.tsx
│   │   ├── Logo.tsx                  The logo image + wordmark
│   │   ├── ProductCard.tsx / ArticleCard.tsx
│   │   ├── Shelf.tsx                 One category "shelf" of products
│   │   ├── ProductGallery.tsx        The image gallery on a product page
│   │   ├── ResourceList.tsx          The downloadable files list (products + portals)
│   │   ├── VideoEmbed.tsx            The responsive video player
│   │   ├── FaqList.tsx               The FAQ accordion on a portal page
│   │   ├── Changelog.tsx             The version history list on a portal page
│   │   ├── SupportBlock.tsx          The "need a hand?" box on a portal page
│   │   ├── AmbienceToggle.tsx        The 🌿 Ambience button
│   │   ├── ThemeToggle.tsx           Light/dark mode switch
│   │   ├── NewsletterForm.tsx
│   │   ├── EmptyState.tsx            The friendly "nothing here yet" message
│   │   ├── Sprig.tsx                 The small botanical divider graphic
│   │   └── Container.tsx             Consistent page width/padding
│   │
│   ├── lib/                          Code that reads and prepares content
│   │   ├── products.ts               Reads content/products/*.md
│   │   ├── articles.ts               Reads content/articles/*.md
│   │   ├── portals.ts                Reads content/portals/*.md
│   │   ├── markdown.ts               Turns markdown into HTML
│   │   ├── video.ts                  Turns a YouTube/Vimeo link into an embed
│   │   └── constants.ts              Site name, nav links, email, categories
│   │
│   └── types/
│       └── content.ts                Describes the shape of a product/article
│
├── package.json                      Project name + dependencies
├── tailwind.config.ts                Design tokens (colors, fonts, spacing)
├── next.config.mjs                   Next.js configuration
└── README.md                         Start-here overview
```

## Where to look for common tasks

| I want to... | Go to... |
|---|---|
| Add a product | `content/products/` — see `docs/CONTENT_GUIDE.md` |
| Add an article | `content/articles/` — see `docs/CONTENT_GUIDE.md` |
| Add a download portal | `content/portals/` — see `docs/PORTAL_GUIDE.md` |
| Change the homepage text | `src/app/page.tsx` |
| Change the navigation menu | `src/lib/constants.ts` |
| Change colors or fonts | `tailwind.config.ts` and `src/app/globals.css` |
| Change the ambience track | Replace `public/audio/ambience.mp3` |
| Change the logo or hero image | Replace files in `public/images/brand/` |
| Deploy a change | See `docs/DEPLOYMENT.md` |
