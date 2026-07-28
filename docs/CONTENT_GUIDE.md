# Content Guide

Everything you publish on Systemine — every product and every article —
starts as a plain text file in the `content/` folder. This guide covers
how to add each type of content, step by step.

---

## Adding a product

1. Go to `content/products/`.
2. Copy `_template.md`, rename the copy to your product's name, e.g.
   `content/products/moving-out-survival-kit.md`.
3. Fill in the frontmatter at the top of the file:

   | Field | What it does |
   |---|---|
   | `title` | Product name shown everywhere |
   | `slug` | The URL, e.g. `moving-out-survival-kit` → `/shelves/moving-out-survival-kit` |
   | `price` | Shown as text, e.g. `"$14"` |
   | `category` | Which shelf it lives on — reuse an existing name, or type a new one to create a new shelf |
   | `cover` | Main product image (required) |
   | `gallery` | Optional list of extra images shown as "A closer look" |
   | `video` | Optional YouTube or Vimeo link |
   | `resources` | Optional list of downloadable files, each with a `label` and `file` path |
   | `tags` | Short labels shown as pills on the product page |
   | `featured` | `true` to make it eligible for the homepage spotlight |
   | `published` | `true` to make it go live. Keep `false` while you're still working on it |
   | `purchase_url` | Where the "Get [product]" button links to (currently a placeholder — swap in your real checkout link, e.g. Razorpay, when ready) |
   | `portal_slug` | Optional. Identifies this product's Download Portal for your own reference — see `docs/PORTAL_GUIDE.md` |
   | `description` | One or two sentences shown on the product card |

4. Everything below the second `---` is the long description — write it
   in plain markdown.
5. Add your images to `public/images/products/your-product-slug/`, and
   any downloadable files to `public/files/your-product-slug/`.
6. Commit and push (see `DEPLOYMENT.md`). Once live, `published: true`
   products appear automatically on their shelf and, if featured, on
   the homepage.

---

## Adding an article

1. Go to `content/articles/`.
2. Copy `_template.md`, rename it, e.g.
   `content/articles/why-just-be-more-organized.md`.
3. Fill in the frontmatter:

   | Field | What it does |
   |---|---|
   | `title` | Article title |
   | `slug` | The URL, e.g. `/articles/your-slug` |
   | `date` | Used for sorting, newest first |
   | `author` | Shown under the title |
   | `excerpt` | Short teaser shown on the articles list |
   | `cover` | Featured image at the top of the article |
   | `video` | Optional YouTube or Vimeo link |
   | `tags` | Shown at the bottom of the article |
   | `published` | `true` to make it live |

4. Write the article body in plain markdown below the frontmatter.

---

## Adding images

- Product images: `public/images/products/<product-slug>/`
- Article images: `public/images/articles/<article-slug>/`
- Anywhere in an article body, add an inline image with normal markdown:

  ```md
  ![A tidy desk with a notebook and a plant](/images/articles/your-slug/photo.jpg)
  ```

  Inline images are automatically resized responsively and lazy-loaded
  — no extra formatting needed.

Keep images reasonably sized (roughly under 1–2MB, ideally `.jpg` or
`.webp`) so pages load quickly.

---

## Adding video

Both products and articles support one optional video, added by pasting
a normal YouTube or Vimeo link — the kind you'd copy straight from your
browser's address bar — into the `video` field:

```yaml
video: "https://youtu.be/dQw4w9WgXcQ"
```

Leave it blank (`video: ""`) or remove the line entirely if there's no
video. It will render as a responsive, properly sized player — you
don't need to paste an embed code.

---

## Adding downloadable resources (products only)

If a product includes more than one file (a PDF and a spreadsheet, for
example), list them under `resources`:

```yaml
resources:
  - label: "Moving Checklist (PDF)"
    file: "/files/moving-out-survival-kit/checklist.pdf"
  - label: "Budget Tracker (Excel)"
    file: "/files/moving-out-survival-kit/budget-tracker.xlsx"
```

Place the actual files in `public/files/<product-slug>/` first, then
point `file` at that exact path. They'll appear as a tidy "What's
included" list on the product page.

---

## Draft vs. published

Nothing with `published: false` (or a missing `published` field
entirely, if you happened to remove it) ever appears on the live site
— even though the file exists in the repository. This makes it safe to
work on something for days without it going live by accident. Flip it
to `true` when it's genuinely ready.

---

## Download portals

If a product needs a dedicated "thank you for buying, here's your
stuff" page, that's a **Download Portal** — its own markdown-driven
content type, kept separate from products so it can include setup
instructions, an FAQ, version history and more. See
`docs/PORTAL_GUIDE.md` for the full walkthrough.
