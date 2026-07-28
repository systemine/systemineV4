# Deployment

How changes get from your computer to the live website. No command
line needed for day-to-day updates.

---

## The everyday workflow

1. **Make your changes** — add or edit a markdown file in `content/`,
   drop in an image, whatever it is — using your normal file
   explorer/finder and a plain text editor.
2. **Open GitHub Desktop.** It will show every file you've changed,
   with a preview of what's different.
3. **Write a short summary** of what you did in the box at the bottom
   left — e.g. "Add Moving-Out Survival Kit product."
4. **Click "Commit to main."**
5. **Click "Push origin"** at the top.

That's it. From here, everything is automatic.

---

## What happens after you push

This project is connected to **Vercel**, a hosting service that
watches the GitHub repository. Every push triggers a fresh build of
the site automatically:

1. Vercel notices the new commit.
2. It rebuilds the site (usually 1–3 minutes).
3. Once the build succeeds, the live site updates automatically at
   your domain.

You can check on this at [vercel.com](https://vercel.com) → the
Systemine project → **Deployments** tab. A green checkmark means it's
live. A red X means something needs fixing.

---

## If a deploy fails

The most common cause is a small formatting mistake in a markdown
file's frontmatter — a missing quotation mark, or a `---` line that
got deleted or duplicated by accident. To fix it:

1. Open the file that most recently changed.
2. Compare its frontmatter carefully against `_template.md` in the
   same folder (`content/products/` or `content/articles/`).
3. Fix the formatting, save, commit, and push again.

If you're stuck, it's completely reasonable to send the file to a
developer to take a quick look — this kind of fix is usually a couple
of minutes' work.

---

## First-time setup (one-time, for a developer)

If you're setting this project up on Vercel for the first time:

1. Push this repository to GitHub.
2. In Vercel, choose **Add New Project** and import the repository.
3. Leave the framework preset as **Next.js** — Vercel detects it
   automatically.
4. Click **Deploy**.
5. Once deployed, connect your custom domain under
   **Project Settings → Domains**.

No environment variables are required for the site to run, since there
is no database, CMS, or payment integration built in — everything
lives in the repository itself.

---

## Running it locally (developers)

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`. The site rebuilds automatically as
you edit files.

To test a production build before deploying:

```bash
npm run build
npm run start
```
