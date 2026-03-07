## Design Review: Image Resolution Pattern

Review the image handling pattern in `src/utils/images.ts` and give a clear verdict on whether the current approach is sound or should be replaced.

### Context

This is an Astro 5 blog. Articles are `.mdx` files under `src/content/posts/`. Some articles reference hero images and inline images via string paths (e.g. `/content/images/2026/02/some-image.jpg`).

The original `src/utils/images.ts` solved a problem: Astro's image optimization pipeline requires static imports at build time — you can't pass a runtime string path to `<Image />` directly. So the file maintained a manually-curated `Record<string, any>` that mapped every known public-style path to an actual `import()` of the file in `src/assets/images/`.

The file had ~180 lines, one `import` per image. It broke the moment any image was renamed or deleted.

### Current state

The map is now empty. The `getImageAsset()` function falls back to returning the raw string path when no match is found — which works fine for `/blog-placeholder-*.jpg` files served from `public/`, since those are static assets not run through Astro's image pipeline.

### Questions to answer

1. **Is a manual static-import map ever the right pattern in Astro?** Or is there a better built-in mechanism (e.g. `import.meta.glob`, `getImage()`, or co-locating images with posts)?

2. **What's the recommended Astro 5 pattern** for blog posts that reference hero images — should images live in `src/assets/` (processed) or `public/` (unprocessed), and how should the path-to-asset resolution work?

3. **Should `src/utils/images.ts` exist at all?** Or should it be deleted and replaced with a different approach (e.g. co-located images, glob-based map, or simply always using `public/` for article images)?

4. **What's the minimal, maintainable solution** for this specific use case: a demo blog with a small number of articles, where images are referenced by string path in frontmatter (`heroImage: "/some/path.jpg"`)?

Please read `src/utils/images.ts`, `src/layouts/BlogPost.astro`, `src/components/Img.astro`, and `astro.config.mjs` before responding. Give a concrete recommendation with the tradeoffs, not just options.