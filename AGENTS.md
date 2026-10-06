# Marco Pegoraro's Astro Blog — Agent Guidelines

Personal blog migrated from Ghost to Astro.  
Live site: [https://marcopeg.com](https://marcopeg.com)

---

## 🚀 Publishing & Deployment Workflow

### ⚠️ Golden Rule: "Publish" Implies "Deploy"
When the user asks to **"publish"** an article, blog post, or content update, **this strictly implies running the full deployment pipeline**, not just updating local markdown files:
1. **Prepare the Post**:
   - Verify frontmatter: remove `draft: true` (or ensure `draft` is omitted/false).
   - Verify `pubDate` is set to an accurate timestamp in UTC (`YYYY-MM-DDTHH:MM:SS.000Z`).
   - Verify `title`, `description`, and `tags` are populated.
   - Ensure the post is located under `src/content/posts/YYYY/<slug>.mdx`.
2. **Verify Build**:
   - Run `npm run build` locally to verify that MDX parsing, components, image assets, and routes compile cleanly without errors.
3. **Commit & Push to Main**:
   - Stage and commit the post and any accompanying assets.
   - Push the commit to `origin main`.
4. **Trigger Deployment**:
   - Run `make deploy` (or `make deploy.github`).
   - **How it works**:
     1. Generates an annotated git tag using a 14-digit timestamp in `YYYYMMDDHHMMSS` format (e.g., `20261006083246`).
     2. Pushes the tag to `origin`.
     3. The GitHub Actions workflow (`.github/workflows/deploy.yml`) triggers on tag push (`20*`), validates the timestamp tag, builds the AMD64 production Docker image, pushes to Docker Hub, deploys to CapRover, and creates a GitHub Release.
     4. The Makefile automatically polls and verifies the deployed marker (`https://marcopeg.com/deployment-<TAG>.txt`) until the rollout is live.
5. **Report to User**:
   - Share the live article URL and confirm the deployment was verified.

When the user says **"deploy"** (or trigger a release without publishing new content):
- Simply execute `make deploy`.

---

## 🛠 Commands

| Command | Description |
|---|---|
| `make dev` (or `npm run dev`) | Start dev server at `http://localhost:4000` (configurable via `PORT`) |
| `make build` (or `npm run build`) | Production build |
| `make preview` (or `npm run preview`) | Preview production build |
| `make install` (or `npm install`) | Install project dependencies |
| `make deploy` | Deploy via GitHub Actions tag push + CapRover verification |

---

## 💻 Local Development

- **Local Port**: `4000` (default, configurable via `PORT` environment variable; accessible at `http://localhost:4000`).
- **Telemetry**: Astro telemetry is disabled (`ASTRO_TELEMETRY_DISABLED=1`).
- **Domain & Cloudflare Tunnel Support**:
  - The dev server accepts hosts matching `*.42go.dev` (and `42go.dev`) via Cloudflare tunnel (configured under `server.allowedHosts` in `astro.config.mjs`).

---

## 📐 Project Structure

```
astro/
├── src/
│   ├── content/
│   │   ├── posts/          # Blog posts by year (2015/, 2016/, ... 2026/, drafts/)
│   │   ├── pages/          # Static pages (about, projects)
│   │   └── tags.yaml       # Tag definitions (7 categories)
│   ├── components/         # Astro components (Img, Callout, Source, etc.)
│   ├── layouts/BlogPost.astro
│   ├── pages/              # Routes (index, blog, tag/[tag], [...slug])
│   ├── utils/
│   │   ├── images.ts       # Image asset mapping & getImageAsset()
│   │   └── posts.ts        # filterDrafts(), getReadingTime(), getSlugFromId()
│   ├── assets/images/      # Optimized source images
│   ├── data/authors.yaml   # Author info
│   └── styles/global.css   # Global styles, CSS variables
├── public/content/images/  # Static content images
├── .agents/
│   ├── skills/             # Canonical Agent Skills directory
│   └── scripts/            # Helper scripts (e.g. sync-skills)
├── .claude/
│   └── skills -> ../.agents/skills # Symlink to canonical skills
└── CLAUDE.md -> AGENTS.md  # Symlink to this canonical guide
```

---

## 📝 Content Schema

Posts use this frontmatter (defined in `src/content.config.ts`):
```yaml
title: string          # required
description: string    # required
pubDate: date          # required (coerced, e.g. "YYYY-MM-DDTHH:MM:SS.000Z")
updatedDate: date      # optional
heroImage: string      # optional, path like /content/images/YYYY/MM/file or image URL
tags: string[]         # optional
draft: boolean         # optional, default false
shortCode: string      # optional, 3-letter custom alias for marcopeg.com/s/<shortCode> (e.g. "vps")
```

Every published post automatically gets an SEO-compliant short URL at `https://marcopeg.com/s/<code` via `src/pages/s/[code].astro`. If `shortCode` is specified in frontmatter (e.g. `shortCode: "vps"`), it registers that custom keyword; otherwise, a deterministic 3-character hash code is generated. These redirect with `canonical` meta tags and `noindex, follow` directives.

Drafts in `posts/drafts/` are automatically filtered out in production via `filterDrafts()`.

---

## 🧩 Components Available in MDX

Import paths are relative from posts: `'../../../components/ComponentName.astro'`

- **Img** — Inline images with caption from alt text. Props: `src`, `alt`, optional `width`/`height`. Supports wide (default) and full-width layouts.
- **Callout** — Alert/note boxes. Props: `icon` (default 👉), `secondary`, `light`, `bg`, `fg`.
- **Source** — Code blocks with optional filename. Props: `lang`, `filename`.
- **Quote** — Styled blockquote with optional `author`.
- **Note** — Blue left-border blockquote.
- **EmbedTwitter** — Embed tweets. Props: `url` or tweet ID.
- **GitHubRepo** — GitHub repo card (fetches metadata at build). Props: `url`.
- **BookWall** — Grid of book covers. Props: `books` (string[] of image URLs).

---

## 🖼 Hero Image + Social Card Workflow

When adding a new article with a local hero image:
1. Place source image in `src/assets/images/`
2. Add import + `imageMap` entry in `src/utils/images.ts` with key like `/content/images/YYYY/MM/file`
3. Set `heroImage` in post frontmatter to that same key

This single `heroImage` value controls both the article cover and the OG/Twitter preview card. Remote URLs can be used, but custom local images generated via AI are preferred.

### 🎨 Custom Cover Generation (`/cover`)
Use the `/cover <article>` skill (`.agents/skills/cover/SKILL.md`) to design custom hero images:
1. Run `/cover <article-slug>` (e.g., `/cover stop-prompting`).
2. The skill analyzes the post and proposes 2–3 visual directions based on Marco's brand archetypes.
3. Generates 3 candidate 16:9 images, creates lightweight 400px thumbnails for chat & mobile web app viewing, and stores them in `materials/covers/<slug>/` (excluded from Docker builds via `.dockerignore`).
4. Iterates interactively with the user based on feedback.
5. Once approved, automatically copies the winner to `src/assets/images/<slug>-hero.jpg`, registers it in `src/utils/images.ts`, and updates `heroImage` in the post frontmatter.

### 📢 Social Media Distribution (`/social`)
Use the `/social <article>` skill (`.agents/skills/social/SKILL.md`) to draft distribution copy for LinkedIn and X (Twitter):
1. Run `/social <article-slug>` (e.g., `/social stop-prompting` or `/social last published article`).
2. Locates the article, extracts practitioner lessons and narrative tension in Marco's voice.
3. Enforces strict anti-AI-slop rules (no contrast reveals, no broetry, no emoji bullets, no generic engagement bait).
4. Generates a compact LinkedIn post with opening hook ("open view"), body takeaways, exit CTA, 3–5 targeted tags, and ready-to-copy first comment with live article link.
5. Generates an impactful X (Twitter) post and optional thread with direct link and tags.
6. Archives drafts in `materials/social/<slug>/social.md` (excluded from Docker builds via `.dockerignore`) and iterates with the user.

---

## ✍️ Writing Articles

- Use `.mdx` format for new posts.
- Place in `src/content/posts/YYYY/` (use current year, e.g. `2026/`).
- In-progress drafts can reside in `src/content/posts/drafts/`.
- Import components at the top of the file after frontmatter.
- For inline images: place in `public/content/images/YYYY/MM/`, use the `<Img>` component.
- Writing style guidelines and tone are captured in `.agents/skills/blog-writer/`.

---

## 🤖 Agent Standards & Skills Configuration

- **Single Source of Truth**:
  - `AGENTS.md` is the canonical instruction manual for all AI agents.
  - `.agents/skills/` is the canonical storage directory for all Agent Skills (`SKILL.md` format).
- **Tooling Compatibility (Symlinks)**:
  - `CLAUDE.md` is a symlink pointing directly to `AGENTS.md`.
  - `.claude/skills` is a symlink pointing directly to `.agents/skills`.
  - No Cursor support is needed; Cursor directories (`.cursor/`) are retired.
