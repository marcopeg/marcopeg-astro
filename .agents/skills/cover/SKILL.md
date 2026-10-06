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

### Step 3: Generate 3 Candidate Versions
1. Determine the storage directory:
   `materials/covers/<article-slug>/`
   *(Ensure directory exists; this folder is excluded from Docker builds via `.dockerignore`).*
2. Construct three distinct prompts rooted in the archetypes above. Always include warm human elements (steaming coffee, wooden desk, expressive emotion) alongside high-tech server racks.
3. Call `generate_image` for each candidate:
   - `AspectRatio`: `"16:9"`
   - `ImageName`: `candidate_01`, `candidate_02`, `candidate_03`
4. Copy each generated image artifact into `materials/covers/<article-slug>/`:
   - `candidate-01.jpg`
   - `candidate-02.jpg`
   - `candidate-03.jpg`
5. Write/append `materials/covers/<article-slug>/prompts.md` recording:
   - Timestamp and iteration round.
   - Exact prompts used for each candidate.

### Step 4: Review & Interactive Iteration
1. Present the 3 candidates to the user with a short description of the visual mood and prompt rationale for each.
2. Prompt the user for feedback:
   - Do they love one as-is?
   - Or do they want adjustments (e.g. *"I like candidate 2, but make it less cartoonish and add warmer lighting"* or *"more focus on the terminal screen"*?)
3. **If feedback is given**:
   - Formulate refined prompts incorporating the specific feedback.
   - Optionally pass the candidate image path as a reference in `ImagePaths` if tweaking an existing visual.
   - Call `generate_image` to produce new candidate(s) (saved as `candidate-04.jpg`, `candidate-05.jpg`, etc.).
   - Log the feedback and new prompts in `prompts.md`.
   - Present the new candidate(s) for review.
4. **Repeat** until the user explicitly confirms (e.g. *"Option 2 is perfect"*, *"let's go with candidate 4"*, or *"it's ok"*).

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
