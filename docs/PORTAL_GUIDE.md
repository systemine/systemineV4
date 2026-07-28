# Product Download Portal Guide

A **Download Portal** is a private-feeling page you send people to
*after* they've bought something — the place they land to actually
grab their files, read setup instructions, and get support if
something's confusing. Like products and articles, portals are
entirely markdown-driven. You will never need to touch React or
TypeScript to create one.

---

## Creating a new portal

1. Go to `content/portals/`.
2. Copy `_template.md`, rename the copy — e.g.
   `content/portals/moving-out-survival-kit.md`.
3. Fill in the frontmatter fields (all explained below).
4. Write your setup instructions in plain markdown below the second
   `---` — this becomes the main body of the page.
5. Set `published: true` when it's ready.
6. In the matching product's markdown file (`content/products/...`),
   set `portal_slug` to this portal's `slug`. That's what makes the
   "Go to your download portal" link appear automatically on the
   product page.
7. Commit and push. The portal will be live at
   `/portals/your-portal-slug`.

That's the entire process — duplicate a file, edit some text, push.

---

## Every field, explained

Every section below is **optional** except `title`, `slug`, and
`published`. If a field is left out entirely, that section of the page
simply doesn't appear — nothing breaks, nothing shows an empty box.

| Field | Required? | What it does |
|---|---|---|
| `title` | Yes | The heading at the top of the portal page |
| `slug` | Yes | The URL: `/portals/your-slug` |
| `published` | Yes | `true` to go live, `false` to keep it hidden while you work |
| `product_title` | No | A small label above the title, e.g. the product's name |
| `welcome_message` | No | A short, friendly opening line |
| `download` | No | The main download button — see below |
| `video` | No | A YouTube or Vimeo link, embedded as a walkthrough video |
| `faq` | No | A list of question/answer pairs, shown as an accordion |
| `resources` | No | A list of extra downloadable files |
| `changelog` | No | Version history, newest entries first |
| `support` | No | A "need help?" box with an email or link |
| *(markdown body)* | No | Setup instructions — free-form text below the frontmatter |

### `download`

```yaml
download:
  label: "Download the Kit"
  file: "/files/moving-out-survival-kit/kit.zip"
  url: ""
```

Use `file` for something hosted directly in this project (put the
actual file in `public/files/your-slug/` first). Use `url` instead if
the download is hosted somewhere else entirely (Google Drive, Dropbox,
a course platform). Fill in only one of the two — if both are empty,
no button appears.

### `video`

```yaml
video: "https://youtu.be/your-video-id"
```

Paste a normal YouTube or Vimeo link — the kind you'd copy from your
browser's address bar. Leave it blank (`""`) if there's no video.

### `faq`

```yaml
faq:
  - question: "What software do I need?"
    answer: "Everything opens in Google Sheets, Excel, or Notion."
  - question: "Can I use this more than once?"
    answer: "Yes — duplicate the template as many times as you like."
```

Add as many question/answer pairs as you need. They render as a
tidy, tappable accordion.

### `resources`

```yaml
resources:
  - label: "Bonus: Packing Label Templates (PDF)"
    file: "/files/moving-out-survival-kit/labels.pdf"
```

Same format as product resources — extra files beyond the main
download, each with a friendly label.

### `changelog`

```yaml
changelog:
  - version: "1.1"
    date: "2026-02-01"
    notes: "Added a printable label sheet, fixed a formula error."
  - version: "1.0"
    date: "2026-01-10"
    notes: "First release."
```

List newest first. This is a nice way to let repeat customers know
what's changed since they last downloaded.

### `support`

```yaml
support:
  message: "Something not working? Email us and we'll sort it out."
  email: "systeminestore@gmail.com"
  link: ""
  link_label: ""
```

`link`/`link_label` are optional extras if you want to point people
somewhere besides email — a help page, a form, etc. Leave them blank
if email is enough.

### Setup instructions (the markdown body)

Everything you write below the second `---` line becomes the main
"how to get started" section of the page — plain markdown, same as an
article. Numbered steps tend to work well here.

---

## Linking a product to its portal (via Razorpay, not the website)

Portal pages are intentionally **unlisted** — the product page does
not show a link to them, they're excluded from search engines, and
they're left out of the sitemap. The only way anyone reaches a portal
is by having its exact URL, which is normally handed to them by
Razorpay right after payment succeeds.

To wire this up for a product:

1. Publish the portal (`content/portals/your-slug.md`, `published: true`).
2. Note its URL: `https://yourdomain.com/portals/your-slug`.
3. In Razorpay, set that URL as the **redirect / thank-you / success
   URL** for that specific product's payment page.
4. Optionally, set `portal_slug` in the product's own markdown file to
   the same value — this doesn't create any link on the website, it's
   just a handy note in the file for your own future reference, so you
   can see at a glance which portal belongs to which product.

Each product should point to its *own* portal in Razorpay, so a buyer
of Product A only ever lands on Product A's portal — never a shared or
generic one.

A portal doesn't have to belong to a product this way, either — you're
always free to create one and share its link directly, however you
choose to deliver it.

---

## A note on privacy

Portal pages are automatically excluded from search engines and from
the sitemap, since they're meant for people who already have the
link (usually after a purchase), not for public browsing.
