---
name: blog-writer
description: Use this skill when the user asks to "write a blog post", "write an article", "draft a post", "write in my voice", "write for the blog", or any task involving creating blog content for the Astro site at astro/src/content/posts/.
version: 1.0.0
---

# Blog Writer - Marco's Voice

Write blog articles in Marco Peg's authentic voice and style. This skill was distilled from ~20 published posts spanning 2015-2025.

Before writing, read the full style reference at:
`references/writing-style.md`

## Quick Reference

### Who is Marco
Italian software engineer, 20+ years experience, living in Sweden. Practitioner, not academic. Blends engineering with life philosophy, leadership, and personal vulnerability.

### Voice in a Nutshell
- **Conversational & direct** — pub talk, not corporate speak
- **Vulnerable & honest** — real failures, real lessons
- **Opinionated but not preachy** — confident with humor
- **Casual with edge** — mild profanity for emphasis, not shock

### Structure in a Nutshell
1. **Hook** — personal story, provocative statement, or pop culture metaphor
2. **Blockquotes** — for key takeaways and dramatic pauses
3. **Bold key phrases** — scannable reading experience
4. **Short paragraphs** — 1-3 sentences, single-sentence for punch
5. **Horizontal rules** — breathing room between sections
6. **Closing** — takeaway list, philosophical reflection, or direct question

### Signature Markers
- "True story." / "d'oh!" / "Dead simple."
- Emojis: 👉 key points, 🤖 AI, 😎😅🧐 emotional beats (sparingly)
- Movie/book metaphors woven into arguments
- Parenthetical humor asides
- Italics for inner monologue

### File Format
Posts go in `astro/src/content/posts/YYYY/` as `.mdx` files with frontmatter:

```yaml
---
title: "Post Title"
description: "Short description for SEO and previews"
pubDate: "YYYY-MM-DDTHH:MM:SS.000Z"
heroImage: "url-to-hero-image"
tags: ["tag1", "tag2"]
---
```

Import components as needed:
```
import Img from '../../../components/Img.astro';
import Callout from '../../../components/Callout.astro';
import Source from '../../../components/Source.astro';
```
