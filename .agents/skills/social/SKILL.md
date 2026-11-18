---
name: social
description: Turn Marco's blog articles into LinkedIn posts in his voice and save copy-ready sibling .linkedin.txt files. Use for /social, article distribution, or LinkedIn versions of posts; produce X drafts only when requested.
---

# Article social distribution

Create a standalone LinkedIn story from an article in `src/content/posts/`, preserving Marco's experience, uncertainty and voice. The source article is the factual authority. Deliver drafts; posting to an account requires a separate explicit request.

## Read before drafting

1. Resolve the requested article by path, title or slug. For “latest,” use `pubDate` and exclude reference galleries and drafts unless requested.
2. Read the complete article and any existing sibling drafts. Keep user edits; revise the existing draft instead of making a parallel canonical version elsewhere.
3. Use [the blog voice guide](../blog-writer/references/writing-style.md). For repurposing structures, consult the installed [Social Content skill](../social-content/SKILL.md), especially its content-repurposing section. Read its LinkedIn reference only when platform-specific guidance matters.

## Writing decisions

- Choose one clear thread: a real incident, a concrete engineering decision, or an honest personal tension. The post should be useful without visiting the article.
- Open with a specific line from the experience, then use connected paragraphs of roughly 2–3 sentences. Aim for a compact story, not an abstract summary or a list of everything in the article.
- Keep Marco's practitioner voice: conversational, candid, witty where appropriate, technically grounded. Personal essays can stay reflective; don't force every article into a production war story.
- Do not invent dates, measurements, services, outcomes, emotions, quotes or implementation details. Check each number against the current article. An old social draft is not evidence when it differs from the article.
- Preserve uncertainty. Don't turn an estimated implementation time into a measured result or an AI thought experiment into a prediction stated as fact.
- Avoid contrast reveals (“it's not X, it's Y”), broetry, generic engagement bait, emoji bullets, manufactured vulnerability, corporate cliches and em dashes. Keep paragraphs natural and avoid stock self-answered questions.
- Use ordinary plain text, not Markdown headings, bold markers or fake Unicode bold. Include a small number of relevant hashtags if useful.
- Default to a brief “full article in the first comment” ending and place the actual URL in the separate comment file. This is the repository's editorial convention, not a claim that links always reduce reach. Treat algorithm and “best posting time” advice from third-party skills as hypotheses unless backed by current reliable evidence or the user's own data.

## Canonical storage: article siblings

For an article at `src/content/posts/2026/example.mdx`, write:

```text
src/content/posts/2026/example.mdx
src/content/posts/2026/example.linkedin.txt
src/content/posts/2026/example.linkedin-comment.txt
```

- `.linkedin.txt`: only the copy-ready main post and optional hashtags. No labels, frontmatter, character-count annotations or review notes.
- `.linkedin-comment.txt`: only the copy-ready first comment, including a verified first-party short URL.
- Keep the exact article filename stem, including long slugs. Move or rename its siblings when moving or renaming the article.
- Do not create `.linkedin.md` or `.linkedin.mdx`: the current content loader matches those extensions and would treat them as articles. It matches only `**/*.{md,mdx}`, so these `.txt` files are ignored by collections and routes. Keep them out of `public/`, where they would become downloadable assets.
- `materials/social/<slug>/` may hold working notes or historical variants, but the sibling text files are the sole current copy. Don't maintain duplicate canonical LinkedIn drafts.
- Drafts stay drafts. Generating or saving a LinkedIn file does not publish the blog, post to LinkedIn, or authorize a deployment.

## Article URL and comment

Use `https://marcopeg.com/s/<code>` when the built short route is known. Prefer explicit `shortCode` frontmatter. Otherwise verify the generated route targets the article: collision handling can change the simple unsalted hash. Don't invent a custom alias or edit article metadata just to produce a social draft.

For an unpublished article, state that its URL will work after publication; don't imply that it is live.

## Delivery and checks

Report the sibling paths and the main-post character count in chat. Keep counts and review notes out of the text files. Check facts and the copyable plain-text formatting. If changing the storage convention or creating the first siblings in a new collection setup, run the build and verify no LinkedIn pages, RSS entries or sitemap URLs appear. Routine wording edits don't require repeated site builds.

Produce X/Twitter content only if requested. Its post, URL, hashtags and newlines must fit the currently applicable platform limit; measure the complete copy and report the count. Save copy-ready X output as an optional `.x.txt` sibling. Keep iteration notes under `materials/social/`.
