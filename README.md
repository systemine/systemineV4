# Systemine — Project README

Welcome. This document explains how the Systemine website is put
together and how to run it day-to-day, written for someone who isn't a
programmer but needs to add products, add articles, and get changes
live.

If you only remember one thing: **you manage this whole site by editing
text files and pushing them to GitHub.** There is no admin login, no
dashboard, no database. GitHub is the content management system.

This README is the overview. For step-by-step detail, see the
`docs/` folder:

- `docs/CONTENT_GUIDE.md` — every field on a product or article, explained
- `docs/PORTAL_GUIDE.md` — how to create a Product Download Portal
- `docs/DEPLOYMENT.md` — the GitHub Desktop → Vercel workflow, in detail
- `docs/PROJECT_STRUCTURE.md` — a map of every folder and what it's for

---

## 1. The big picture

- The website is built with **Next.js** (a framework for building fast
  websites) and hosted on **Vercel**.
- Every product and every article on the site comes from a plain text
  file written in **Markdown** (a simple, readable text format) that
  lives inside this project, in the `content/` folder.
- When you add, edit, or remove one of those files and push the change
  to GitHub, Vercel notices automatically and rebuilds the live site
  within a minute or two. You never touch code to add a product or a
  post.

The day-to-day workflow is:

```
Write a markdown file  →  Add any images  →  Commit in GitHub Desktop
     →  Push  →  Vercel rebuilds the site automatically
```

---

## 2. Project structure

```
systemine/
├── content/                 ← EVERYTHING you'll edit most often
│   ├── products/            ← one .md file per product
│   └── articles/            ← one .md file per article
│
├── public/                  ← images, audio, and other static files
│   ├── images/
│   │   ├── products/        ← cover images for products, one folder per product
│   │   ├── articles/        ← cover images for articles
│   │   ├── brand/
│   │   │   ├── logo.png     ← the Systemine logo (used as favicon + header logo)
│   │   │   └── hero-cover.png ← homepage hero image + social share image
│   └── audio/
│       └── ambience.mp3     ← the background flute loop
│
├── src/
│   ├── app/                 ← one folder per page (see below)
│   ├── components/          ← reusable pieces (header, footer, cards, etc.)
│   ├── lib/                 ← the code that reads your markdown files
│   └── types/                ← type definitions (for the code, not content)
│
├── package.json             ← the project's name and its dependencies
├── tailwind.config.ts       ← the design system (colors, fonts, spacing)
└── README.md                ← this file
```

You will spend 95% of your time in **`content/`** and **`public/images`**
and almost never need to open anything inside `src/`.

---

## 3. How to add a new product

1. Open the `content/products/` folder.
2. Duplicate the file `_template.md` (it explains every field with
   comments) and rename your copy — for example
   `content/products/moving-out-survival-kit.md`. The file name doesn't
   matter much; the `slug` field is what actually determines the URL.
3. Open your new file in any plain text editor and fill in the top
   section (between the two `---` lines), called the **frontmatter**:

   ```yaml
   ---
   title: "The Moving-Out Survival Kit"
   slug: "moving-out-survival-kit"
   price: "$14"
   category: "Life Transitions"
   cover: "/images/products/moving-out-survival-kit/cover.jpg"
   gallery: []
   video: ""
   resources: []
   tags: ["moving", "checklist", "first apartment"]
   featured: true
   published: true
   purchase_url: "https://your-real-checkout-link-goes-here"
   description: "A short, one- or two-sentence summary shown on cards."
   ---
   ```

   - **`category`** determines which "shelf" it appears on. Use one of
     the existing category names to add it to that shelf, or type a new
     name to create a brand-new shelf — no code changes required.
   - **`featured: true`** makes it eligible to appear in the "From the
     shelves" section on the homepage (only the first three featured
     products show there).
   - **`published: true`** is what makes it go live. Leave it `false`
     while you're still working on it — the product stays completely
     invisible until you flip this to `true`.
   - **`purchase_url`** should link to wherever people actually complete
     checkout. The site itself doesn't process payments — this is a
     placeholder field, meant to be pointed at a provider like Razorpay
     when you're ready.
   - **`gallery`**, **`video`**, and **`resources`** are all optional —
     see `docs/CONTENT_GUIDE.md` for the full details on each.

4. Below the second `---`, write anything you like in plain markdown —
   this becomes the longer description on the product's own page.
5. Add a cover photo. Create a folder like
   `public/images/products/moving-out-survival-kit/` and drop your
   image in there (name it `cover.jpg` or similar), then make sure the
   `cover:` field above points to that exact path.
6. Save, commit, and push (see Section 7). Once Vercel finishes
   redeploying, your product will appear automatically on the homepage
   (if featured) and on its shelf at `/shelves`.

---

## 4. How to add a new article

Exactly the same process, in `content/articles/` instead:

1. Duplicate `content/articles/_template.md` and rename it.
2. Fill in the frontmatter:

   ```yaml
   ---
   title: "Why 'Just Be More Organized' Never Actually Works"
   slug: "why-just-be-more-organized-never-works"
   date: "2026-03-14"
   author: "Systemine"
   excerpt: "A short teaser sentence shown on the articles page."
   cover: "/images/articles/why-just-be-more-organized/cover.jpg"
   tags: ["mindset", "systems"]
   published: true
   ---
   ```

3. Write the article body below the frontmatter in markdown.
4. Add a cover image the same way as products, inside
   `public/images/articles/your-article-slug/`.
5. Set `published: true`, commit, and push. It'll appear on `/articles`
   automatically, newest first (based on the `date` field), and on the
   homepage's "Recent thinking" section (the three most recent).

---

## 5. How to change the homepage

The homepage lives at `src/app/page.tsx`. Most of what you'll want to
change there is short pieces of text:

- The big headline and paragraph in the **Hero** section near the top.
- The short one-line notes under each category name (search for
  `CATEGORY_NOTES` near the top of the file).
- The quote in the **About Preview** section.

Everything else on the homepage (which products and articles appear)
updates automatically based on your markdown files — you don't need to
touch the code for that part.

If you're not comfortable editing code directly, it's completely
reasonable to ask a developer to make small text tweaks here from time
to time; the structure of the page won't need to change.

---

## 6. How to update the navigation

Open `src/lib/constants.ts`. Near the top you'll find:

```ts
export const NAV_LINKS = [
  { href: "/shelves", label: "Browse the Shelves" },
  { href: "/articles", label: "Articles" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];
```

Add, remove, or reorder entries here to change the links in the header
menu. The same file also controls the footer links (`FOOTER_LINKS`),
the social links (`SOCIALS`), and the order the category "shelves"
appear in (`CATEGORY_ORDER`).

---

## 7. GitHub Desktop workflow (the part you'll use constantly)

You don't need to know git commands. GitHub Desktop gives you a simple
visual way to do this:

1. **Open GitHub Desktop** and make sure it's pointed at this project
   (it will already be set up after the first time).
2. Make your changes — add a markdown file, edit some text, drop in an
   image — using your normal file explorer/finder and text editor.
3. Switch back to **GitHub Desktop**. You'll see a list of every file
   you changed, with a preview of what changed.
4. At the bottom left, write a short summary of what you did — for
   example "Add Moving-Out Survival Kit product" — in the **summary**
   box.
5. Click **Commit to main**.
6. Click **Push origin** at the top. This sends your changes up to
   GitHub.

That's it. You never need to touch the "Branch," "Pull Request," or
other more advanced buttons for this workflow.

---

## 8. How deployment works (Vercel)

This project is connected to **Vercel**, a hosting service that watches
this GitHub repository. Every time you push a change (Section 7):

1. Vercel automatically starts building a fresh version of the site.
2. This usually takes 1–3 minutes.
3. Once it finishes, the live site at your domain updates automatically.

You can watch the build happen (and see if something went wrong) by
logging into [vercel.com](https://vercel.com), opening the Systemine
project, and looking at the **Deployments** tab. A green checkmark
means it's live. A red X means something needs fixing — usually a typo
in a frontmatter field (see the troubleshooting note below).

### If a deploy fails

The most common cause is a mistake in a markdown file's frontmatter —
for example, forgetting a closing quotation mark, or misaligning the
`---` lines. Open the file, compare it carefully against `_template.md`,
fix the formatting, commit, and push again.

---

## 9. Where to place images

- **Product covers:** `public/images/products/<product-slug>/cover.jpg`
- **Article covers:** `public/images/articles/<article-slug>/cover.jpg`
- **Site-wide images** (logo, social share image): `public/images/`

Reference them in your markdown frontmatter starting with a forward
slash, exactly matching the folder structure, e.g.:

```yaml
cover: "/images/products/moving-out-survival-kit/cover.jpg"
```

Keep images reasonably sized (under ~1–2MB each, ideally saved as
`.jpg` or `.webp`) so pages load quickly. Next.js automatically
optimizes and resizes images for different screen sizes, so you don't
need to create multiple versions yourself.

---

## 10. Where to place audio

The background ambience track lives at:

```
public/audio/ambience.mp3
```

To change the ambience sound, replace this file with a new one of the
same name (`ambience.mp3`), keeping it reasonably short (a minute or
two) since it loops. It's referenced directly in
`src/components/AmbienceToggle.tsx` if you ever need to change the
filename or add a second track.

---

## 11. Running the project locally (for developers)

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`. The site rebuilds automatically as
you edit files.

To build a production version:

```bash
npm run build
npm run start
```

---

## 12. A few decisions worth knowing about

- **No CMS, no database, by design.** Content lives in the repository
  as markdown so the non-technical owner can manage everything through
  GitHub Desktop, and so the whole site can be version-controlled,
  backed up, and rolled back like any other code change.
- **`published: false` is the draft state.** Anything not explicitly
  published never appears on the live site, even if the file exists in
  the repository. This makes it safe to work on a product or article
  over several days without it going live early.
- **Categories are free-form.** The list in `CATEGORY_ORDER`
  (`src/lib/constants.ts`) just controls the *display order* of
  categories that already have products in them — a brand-new category
  name in a product's frontmatter will still create a new shelf, just
  appended after the ones already ordered.

If anything in this document is unclear, that's a good sign it should
be improved — feel free to edit this README the same way you'd edit
anything else.
