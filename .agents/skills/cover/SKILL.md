---
name: cover
description: "Generates, reviews, and applies custom cover hero images for blog articles. Use when the user runs '/cover <article>', asks for an article cover image, or wants to design/iterate on a post hero image. Reads the article, proposes visual concepts, generates 3 candidate versions, iterates with the user, preserves history in materials/covers/, and wires the final image into Astro."
---

# Article Cover Designer Skill (`/cover`)

Interactive, iterative cover image designer for Marco's Astro blog. Generates bespoke 16:9 hero images locally using Antigravity's `generate_image`, archives candidate iterations in `materials/covers/`, and wires the approved image into Astro's asset pipeline (`src/utils/images.ts` + Sharp optimization).

---

## Command Syntax

```bash
/cover <article-query>
```
`<article-query>` can be:
- An exact or partial slug (e.g. `stop-prompting`, `vps-pairing`, `50-first-tasks`)
- A file path (e.g. `src/content/posts/2026/it-started-with-a-quick-checkup-...mdx`)
- An article title fragment (e.g. `"Stop Prompting"`, `"Quick Checkup"`)

---

## End-to-End Workflow

```
[Locate Article] 
       ↓
[Analyze Content & Metaphors] 
       ↓
[Propose Visual Concepts & Clarify Style] 
       ↓
[Generate 3 Initial Candidates (16:9)] 
       ↓
[Archive Candidates in materials/covers/<slug>/]
       ↓
[Review with User & Iterate based on Feedback] 
       ↓
[User Confirms ("it's ok")]
       ↓
[Apply Winner: copy to src/assets/images/ + register in images.ts + update frontmatter]
       ↓
[Verify Build (npm run build)]
```

---

## Detailed Steps

### Step 1: Locate & Analyze the Article
1. Search `src/content/posts/**/*.mdx` (including drafts if applicable) matching the query.
2. Read the frontmatter (`title`, `description`, `tags`, `pubDate`, current `heroImage`) and body content.
3. Extract:
   - **Core theme & tension**: What problem does the post solve?
   - **Visual metaphors**: E.g., server racks, shields, terminal glow, co-pilots, coffee cups, broken cables.
   - **Tone**: Practitioner, serious, humorous, provocative, technical.

### Step 2: Propose Visual Directions & Clarify
Before blind generation, align with the **Marco Peg Visual Archetypes** defined in `.agents/skills/blog-image-style/SKILL.md`:
- **Archetype 1 (Pop Culture / Cinema Remix)**: E.g., iconic movie duo homage (*Pulp Fiction*, *Men in Black*, *Matrix*, *50 First Dates*) subverted with AI/tech humor (robot co-pilot, cables, server racks).
- **Archetype 2 (Humorous Developer Caricature)**: E.g., expressive, exaggerated comic/editorial illustration of a skeptical developer and robot pair-engineering with coffee, messy wires, and real emotion.
- **Archetype 3 (Tangible Ironic Metaphor)**: E.g., physical objects, humorous signs, real-world analogies grounded in the messy reality of production.
*(Strictly avoid generic corporate 3D plastic mannequins, generic glowing blue globes, or stock cybersecurity clichés).*

### Step 3: Generate the 3 Archetype Candidates
1. Determine storage:
   `materials/covers/<article-slug>/` (excluded from Docker builds via `.dockerignore`). Ensure directory exists.
2. Construct 3 distinct prompts mapping directly to **Marco Peg's Visual Archetypes** ([`blog-image-style`](../blog-image-style/SKILL.md)):
   - **Candidate 1 (Pop-Culture Cinema Remix)**: Iconic movie poster or scene parody (*Pulp Fiction*, *50 First Dates*, *The Godfather*, *Men in Black*, *Matrix*) subverted with tech/AI humor (robot co-pilot, keyboards, cables).
   - **Candidate 2 (Humorous Developer Caricature)**: Expressive comic/editorial illustration of the developer & robot assistant with real emotion (ironic shrug, frantic typing, coffee mugs, glowing padlock).
   - **Candidate 3 (Tangible Ironic Metaphor)**: Real-world physical object (*In Case of Outage Break Glass*, vintage signs, physical keys/locks).
3. Call `generate_image` for each candidate with `AspectRatio: "16:9"`.
4. Save images to `materials/covers/<article-slug>/` as `candidate-01.jpg`, `candidate-02.jpg`, `candidate-03.jpg`.
5. Log exact prompts and concepts in `materials/covers/<article-slug>/prompts.md`.

### Step 4: Multi-Channel Presentation & Interactive Selection
Because chat webviews enforce strict Content Security Policies that block raw local `file:///` URLs inside `<img>` tags, **always propose candidates using this triple-channel presentation**:

1. **Inline Interactive Chat Widget (`<agent-embed>`)**:
   - Generate an HTML artifact using base64-embedded images and Tailwind tabs/carousel (under 500px tall).
   - Embed in the chat response: `<agent-embed src="file:///<artifact-dir>/cover_viewer.html"></agent-embed>` so the user can click tabs directly in the chat.
2. **Local Dev Server Browser Links**:
   - Copy images to `public/covers/<slug>/`.
   - Provide direct browser links: `http://localhost:4000/covers/<slug>/candidate-XX.jpg`.
3. **Clickable IDE File Links**:
   - Provide direct markdown file links: `[candidate-01.jpg](file:///.../materials/covers/<slug>/candidate-01.jpg)` which open in editor tabs.
4. **Interactive Selection via `ask_question`**:
   - Use the `ask_question` tool with options for Candidate 1, Candidate 2, Candidate 3, or "Iterate with feedback".
   - If the user provides feedback, generate refined version(s), save to `materials/covers/<slug>/`, update the viewer, and re-prompt until approved ("it's ok").

### Step 5: Apply the Winning Image to the Article
Once approved:
1. **Copy Asset**:
   Copy the winning candidate into `src/assets/images/`:
   ```bash
   cp materials/covers/<slug>/candidate-XX.jpg src/assets/images/<slug>-hero.jpg
   ```
2. **Register in Asset Map** (`src/utils/images.ts`):
   - Add import:
     ```ts
     import <slugCamel>Hero from '../assets/images/<slug>-hero.jpg';
     ```
   - Add to `imageMap`:
     ```ts
     '/content/images/<YYYY>/<MM>/<slug>-hero.jpg': <slugCamel>Hero,
     ```
     *(Use the publication year and month from the article frontmatter, or current year/month).*
3. **Update Article Frontmatter**:
   In the target `.mdx` file, update `heroImage`:
   ```yaml
   heroImage: "/content/images/<YYYY>/<MM>/<slug>-hero.jpg"
   ```
4. **Verify Local Build**:
   Run `npm run build` to verify that Astro + Sharp compile the image asset into responsive WebP formats without error.

### Step 6: Deploy (If Requested)
If the user asks to deploy or publish the update:
Follow the golden rule in `AGENTS.md`: commit changes, push to `main`, and execute `make deploy`.

---

## Storage & Docker Isolation

- **Historical Candidates**: Stored under `materials/covers/<slug>/`.
- **Docker Build Context**: `materials/` is listed in `.dockerignore` so candidate drafts never bloat production Docker images or CapRover deployments.
- **Production Asset**: Only the approved, registered image in `src/assets/images/` is compiled into the site bundle.
