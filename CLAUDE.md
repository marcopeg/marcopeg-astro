# Marco Pegoraro's Astro Blog

Personal blog migrated from Ghost to Astro. Site: https://marcopeg.com

## Tech Stack
- **Framework**: Astro 5.x with MDX support
- **Content**: MDX/Markdown in `astro/src/content/posts/` organized by year (2015-2025)
- **Styling**: Vanilla CSS, system font stack, Atkinson font face
- **Images**: Sharp for optimization, custom asset mapping in `src/utils/images.ts`
- **Site Constants**: `src/consts.ts` (SITE_TITLE, SITE_DESCRIPTION)

## Commands
- `make dev` — Start dev server at http://localhost:4321
- `make build` — Production build
- `make preview` — Preview production build
- `make install` — Install dependencies

## Project Structure
```
astro/
├── src/
│   ├── content/
│   │   ├── posts/          # Blog posts by year (2015/, 2016/, ... 2025/, drafts/)
│   │   ├── pages/          # Static pages (about, projects)
│   │   └── tags.yaml       # Tag definitions (7 categories)
│   ├── components/         # Astro components (see below)
│   ├── layouts/BlogPost.astro
│   ├── pages/              # Routes (index, blog, tag/[tag], [...slug])
│   ├── utils/
│   │   ├── images.ts       # Image asset mapping & getImageAsset()
│   │   └── posts.ts        # filterDrafts(), getReadingTime(), getSlugFromId()
│   ├── assets/images/      # Optimized source images
│   ├── data/authors.yaml   # Author info
│   └── styles/global.css   # Global styles, CSS variables
└── public/content/images/  # Static content images
```

## Content Schema
Posts use this frontmatter (defined in `src/content.config.ts`):
```yaml
title: string          # required
description: string    # required
pubDate: date          # required (coerced)
updatedDate: date      # optional
heroImage: string      # optional, path like /content/images/YYYY/MM/file
tags: string[]         # optional
draft: boolean         # optional, default false
```

Drafts in `posts/drafts/` are automatically filtered out in production via `filterDrafts()`.

## Components Available in MDX
Import paths are relative from posts: `'../../../components/ComponentName.astro'`

- **Img** — Inline images with caption from alt text. Props: `src`, `alt`, optional `width`/`height`. Supports wide (default) and full-width layouts.
- **Callout** — Alert/note boxes. Props: `icon` (default 👉), `secondary`, `light`, `bg`, `fg`.
- **Source** — Code blocks with optional filename. Props: `lang`, `filename`.
- **Quote** — Styled blockquote with optional `author`.
- **Note** — Blue left-border blockquote.
- **EmbedTwitter** — Embed tweets. Props: `url` or tweet ID.
- **GitHubRepo** — GitHub repo card (fetches metadata at build). Props: `url`.
- **BookWall** — Grid of book covers. Props: `books` (string[] of image URLs).

## Hero Image + Social Card Workflow
When adding a new article with a hero image:
1. Place source image in `astro/src/assets/images/`
2. Add import + `imageMap` entry in `src/utils/images.ts` with key like `/content/images/YYYY/MM/file`
3. Set `heroImage` in post frontmatter to that same key

This single `heroImage` value controls both the article cover and the OG/Twitter preview card.

## Writing Articles
- Use `.mdx` format for new posts
- Place in `astro/src/content/posts/YYYY/` (use current year)
- Drafts go in `astro/src/content/posts/drafts/`
- Import components at top of file after frontmatter
- For inline images: place in `astro/public/content/images/YYYY/MM/`, use `<Img>` component

## Blog Layout
- Grid pattern: 1 featured post (6 cols), 2 posts (3 cols each), 3+ posts (2 cols each)
- Max-width: 1600px desktop
- Responsive: 3 cols → 2 cols (991px) → 1 col (767px)
- 22px tag placeholder ensures vertical alignment across cards

## Style Notes
- Primary accent: `#1b9cff` (blue)
- Footer background: `#0d0d0d`
- Global `box-sizing: border-box`
- Navigation: About, Communication, Tutorials, Tips & Tricks
