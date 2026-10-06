---
name: social
description: "Generates tailored social media distribution posts (LinkedIn and X/Twitter) for blog articles. Use when the user runs '/social <article>', asks for a social post for an article, or wants to distribute a post. Locates the article, extracts the practitioner narrative and core lessons in Marco Peg's voice, drafts a punchy LinkedIn post (with hook, compact body, exit CTA, tags, and first comment link), drafts an impactful X/Twitter post, archives drafts in materials/social/, and iterates with the user."
---

# Article Social Distribution Skill (`/social`)

Generates compact, high-impact, authentic social media distribution packages for Marco's blog articles across **LinkedIn** and **X (Twitter)**. 

Rooted in Marco Peg's practitioner voice (senior software engineer/architect, candid, witty, battle-tested, no corporate fluff), it enforces strict anti-AI-slop rules, formats clean hooks, compact bodies, exit CTAs, targeted tags, and preserves drafts in `materials/social/<slug>/` (excluded from Docker builds).

---

## Command Syntax

```bash
/social <article-query>
```

`<article-query>` can be:
- An exact or partial slug (e.g. `stop-prompting`, `vps-pairing`, `50-first-ai-tasks`)
- A natural-language shortcut (e.g. `last published article`, `latest post`, `current article`)
- An article title fragment (e.g. `"Stop Prompting"`, `"Quick Checkup"`)
- A file path (e.g. `src/content/posts/2026/it-started-with-a-quick-checkup-...mdx`)

---

## End-to-End Workflow

```
[Locate Article in src/content/posts/]
               ↓
[Analyze Narrative Arc, Practitioner Lessons & Tension]
               ↓
[Extract Open View (Hook), Core Story & Exit CTA]
               ↓
[Draft LinkedIn Post + Tags + First Comment Link]
               ↓
[Draft X / Twitter Post + Tags + Article Link]
               ↓
[Archive Drafts in materials/social/<slug>/social.md]
               ↓
[Present in Chat & Iterate Interactively based on Feedback]
```

---

## Detailed Steps

### Step 1: Locate & Read the Article
1. Find matching `.mdx` file under `src/content/posts/**/*.mdx` (or drafts if explicitly targeted).
2. Extract frontmatter:
   - `title`: Article title
   - `description`: Summary/meta description
   - `pubDate`: Publication date
   - `tags`: Categories/tags
   - `heroImage`: Registered cover image
3. Read the body content to understand the journey:
   - The trigger: What sparked the piece?
   - The friction: What went wrong or challenged expectations?
   - The breakthrough: What was the architectural/mental shift?
   - The takeaway: What concrete lesson can fellow engineers apply?
4. Formulate the canonical live URL:
   `https://marcopeg.com/<slug>/`

---

### Step 2: Marco Peg Tone & Anti-AI Rules

Posts must sound like an experienced practitioner sharing real notes from production, not a marketing agency or an AI summarizer.

#### Tone Characteristics
- **Pragmatic & Technical**: Speaks engineer-to-engineer. Focuses on architecture, terminals, config files, and real decisions.
- **Honest & Grounded**: Acknowledges mistakes, messy setups, and counter-intuitive lessons.
- **Punchy & Natural**: Short, digestible paragraphs with natural pauses.

#### Strictly Banned AI Tells (Zero Tolerance)
- ❌ **No contrast reveals**: Never use "It's not X, it's Y" or "Not because X. Because Y." State the point directly with the reason.
- ❌ **No broetry**: Never format as one short line per sentence for the whole post. Write cohesive, 2–3 sentence paragraphs.
- ❌ **No cheesy engagement bait**: Never end with "Agree?", "Thoughts?", "Let that sink in.", "Read that again."
- ❌ **No emoji bullets**: Never start every line with 🚀 💡 ✅ 💥 🔥. Use clean sentences or standard dashes sparingly.
- ❌ **No manufactured vulnerability**: Never start with "I'll be honest, I was terrified..." unless backed by a real incident.
- ❌ **No marketing cliches**: Never use "Say goodbye to...", "Unlock the power of...", "Take it to the next level", "In today's fast-paced world."
- ❌ **No em dashes**: Use a period or a clean line break instead.

---

### Step 3: Draft the LinkedIn Package

LinkedIn algorithms penalize outbound links inside the main post body. The post must deliver native value directly in the feed, with the article link cleanly placed in the first comment.

#### 1. The Open View (Opening Hook)
- The first 1–2 lines determine whether the reader clicks "see more".
- Start with a bold point of view, a counter-intuitive observation, or a specific real-world trigger (e.g. *"A naive 'can you do a quick checkup' turned into a 2-hour production hardening session."*).

#### 2. The Compact Body
- 2 to 4 concise paragraphs.
- Tell the story: the initial assumption, the unexpected finding, the concrete solution, and the rule learned.
- Ensure the reader learns something useful even if they never leave LinkedIn.

#### 3. The Exit (Call to Action / CTA)
- Smoothly transition the reader to the full deep dive ("move to the exit").
- Clearly indicate that the full step-by-step notes, terminal commands, or architectural details are linked in the first comment.

#### 4. Targeted Tags (Hashtags)
- Include 3 to 5 relevant, high-signal technical hashtags (e.g. `#DevOps #CloudEngineering #SoftwareArchitecture #AI #SysAdmin`).
- Place them at the very bottom with a blank line separating them from the body.

#### 5. First Comment
- Provide the ready-to-copy first comment text:
  - **Always use the first-party short URL**: `https://marcopeg.com/s/<code` (clean, mobile-friendly, branded, and avoids long messy slug URLs in comments).
  - A 1-sentence prompt or discussion question to seed authentic technical comments from peers.

---

### Step 4: Draft the X (Twitter) Package

Create a crisp, impactful version strictly engineered for X's fast-moving tech audience and character limits:

#### 1. First-Party Short URLs (`marcopeg.com/s/<code`)
**Both LinkedIn first comments and X posts must use the first-party short redirect URL**:
- Read `shortCode` from the post frontmatter (e.g. `shortCode: "vps"` -> `https://marcopeg.com/s/vps`).
- If no `shortCode` exists in frontmatter, propose a 3-letter semantic code, add it to frontmatter, or use the deterministic 3-character hash code generated by `hashSlugTo3Chars(slug)`.
- The short URL is: `https://marcopeg.com/s/<code` (~23–26 characters, 100% first-party).
- Never use third-party shortener services (TinyURL, Bitly, etc.).

#### 2. Strict 280-Character Budget Validation
Standard X/Twitter accounts enforce a strict **280-character limit**. Any overflow is highlighted in red on mobile and blocks posting.
- **Budget**: The entire post (copy + short URL + hashtags + line breaks) must strictly measure **≤ 275 characters** (target: 240–265 characters).
- Always print the exact character count alongside the draft (e.g. `[258 / 280 chars]`).

#### 3. Single Post Format (Primary)
- **Hook**: Sharp, opinionated statement or lesson in 1 sentence.
- **Core Summary**: 1–2 punchy sentences distilling the friction and architectural rule.
- **Link**: The generated short URL.
- **Tags**: 1–2 focused hashtags (e.g. `#DevOps #AI`).

#### 4. Thread Option (For Deep Dives / Tutorials)
If the article contains multiple distinct tactical steps, format a 3–4 tweet thread where **every individual tweet stays strictly under 275 characters**:
- **Tweet 1**: Hook + context + "Here is what happened and what we changed: 🧵"
- **Tweet 2**: The friction or misconception encountered.
- **Tweet 3**: The technical solution or architectural pattern.
- **Tweet 4**: The golden takeaway + short link to full write-up.

---

### Step 5: Archive Drafts Locally

1. Create directory `materials/social/<slug>/` if it does not exist:
   *(Note: `materials/` is ignored in `.dockerignore`, keeping Docker builds lean).*
2. Save the complete generated content to `materials/social/<slug>/social.md`:
   - Metadata (article title, slug, live URL, timestamp)
   - LinkedIn post copy
   - LinkedIn first comment copy
   - X (Twitter) post copy / thread
   - Iteration history

---

### Step 6: Interactive Presentation & Review

1. Present both the LinkedIn and X packages in clear markdown code blocks for easy 1-click copying.
2. Solicit user feedback:
   - Ask if they want adjustments to the hook, tone, length, or tags.
   - Iterate based on feedback, updating `materials/social/<slug>/social.md` until the user confirms ("it's ok").
