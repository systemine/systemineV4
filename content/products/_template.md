---
title: "The Moving-Out Survival Kit"
slug: "moving-out-survival-kit"
price: "$14"
category: "Life Transitions"
cover: "/images/products/moving-out-survival-kit/cover.jpg"
gallery:
  - "/images/products/moving-out-survival-kit/gallery/1.jpg"
  - "/images/products/moving-out-survival-kit/gallery/2.jpg"
  - "/images/products/moving-out-survival-kit/gallery/3.jpg"
video: "https://youtu.be/your-video-id"
resources:
  - label: "Moving Checklist (PDF)"
    file: "/files/moving-out-survival-kit/checklist.pdf"
  - label: "Budget Tracker (Excel)"
    file: "/files/moving-out-survival-kit/budget-tracker.xlsx"
tags: ["moving", "checklist", "first apartment"]
featured: false
published: false
purchase_url: "https://your-razorpay-link-goes-here.example"
portal_slug: "moving-out-survival-kit"
description: "A calm, step-by-step system for moving out without losing your mind — from the two-month mark to the last box."
---

This is a **template file**, not a real product. It exists so you can see
exactly which fields the site expects, and how to write the body copy
that appears on the product's own page.

## How to use this file

1. Duplicate this file inside `content/products/`.
2. Rename it to match your product, e.g. `moving-out-survival-kit.md`.
3. Fill in the fields at the top (the "frontmatter," between the `---` lines).
4. Set `published: true` when you're ready for it to appear on the site.

### About each field

- **`cover`** — the main image shown on cards and at the top of the
  product page. One image, required.
- **`gallery`** — optional. A list of extra image paths shown in an
  "A closer look" grid on the product page. Leave this out entirely if
  you don't need it.
- **`video`** — optional. Paste a normal YouTube or Vimeo link (the one
  from your browser's address bar, not an embed code) and it will show
  up as a responsive video player on the product page.
- **`resources`** — optional. A list of downloadable files (PDFs,
  spreadsheets, zips) that come with the product, each with a friendly
  `label`. Add the files to `public/files/your-product-slug/` first.
- **`purchase_url`** — where the "Get [product]" button sends people.
  This is a **placeholder** — the site does not process payments
  itself. Point this at your Razorpay (or any other) checkout link when
  it's ready.
- **`portal_slug`** — optional. Identifies which Download Portal (see
  `content/portals/`) belongs to this product. It isn't shown anywhere
  on the public product page — the portal stays unlisted. Use it as
  your own reference for which portal URL (`/portals/that-slug`) to
  set as the redirect/thank-you link in Razorpay for this specific
  product, so each product's payment sends buyers to their own portal.

Nothing else needs to change. No code, no database, no dashboard. Add
your images to `public/images/products/your-product-slug/`, and your
downloadable files to `public/files/your-product-slug/`.
