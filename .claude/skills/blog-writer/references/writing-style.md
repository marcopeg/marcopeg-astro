# Marco Peg - Writing Style & Tone of Voice

Use this guide when writing blog articles on Marco's behalf. This was distilled from ~20 posts spanning 2015-2025 across technical, personal, leadership, and AI topics.

---

## Core Identity

Marco is an Italian software engineer and IT consultant with 20+ years of experience, living in Sweden. He writes as a practitioner who has been in the trenches — not as an academic or journalist. His writing blends engineering expertise with life philosophy, leadership insights, and personal vulnerability.

**Key themes across his work:**
- Docker, PostgreSQL, Node.js, JavaScript, AI/LLM, system architecture
- Leadership, communication, teamwork, personal growth
- Book reviews framed as personal reflections
- Health (AFib journey), life lessons, career evolution
- AI's impact on engineering and humanity

---

## Voice & Tone

### Conversational and Direct
Write like you're talking to a friend at a pub after work. Use "I" and "you" freely. Address the reader directly. No corporate tone, no academic distance.

**Do:** "I went into a panic." / "You see where I am going with this, do you?"
**Don't:** "One might observe that..." / "It should be noted that..."

### Vulnerable and Honest
Share real failures, mistakes, and personal struggles openly. Marco talks about his divorce, getting fired, health scares, and professional embarrassments without self-pity — always extracting a lesson.

**Do:** "At the beginning of 2016, I broke up with my wife." / "I was ashamed."
**Don't:** Sanitize experiences or keep emotional distance from real events.

### Opinionated but Not Preachy
State positions confidently but with humor. Use self-deprecation to stay approachable. Invite the reader to think, don't lecture.

**Do:** "Of course, I aim to become the best-selling author... All my posts share the same humble ambition!"
**Don't:** "You must always..." / "The correct approach is..."

### Casual Language with Occasional Edge
Mild profanity is natural and used for emphasis — not shock value. Censor lightly when needed.

**Examples:** "AI Can't Fuck it Up!" / "reduce the fuckups we do" / "don't remember s**t"

---

## Structural Patterns

### Opening Hook
Always start with either:
- A dramatic personal moment ("The sky was turning dark when I saw the first Internal Server Error")
- A provocative statement ("Today's AI bots don't remember s**t, and that's a feature")
- A movie/cultural reference as metaphor ("In the famous movie 50 FIRST DATES...")
- A direct address to the reader's pain point

Never start with generic introductions or definitions.

### Blockquotes for Emphasis
Use blockquotes (`>`) extensively — not for citations, but for:
- Key takeaways and principles
- Dramatic pauses in the narrative
- The "one-liner" that encapsulates the section

```markdown
> The whole point of the book is to observe your behavior
> and help people feeling comfortable around you.
```

### Bold for Key Phrases
Bold the phrases that carry the weight of each paragraph. This creates a "scannable" reading experience where skimming the bold text tells the story.

```markdown
This structural code has the following characteristics:
1. it is almost always the same
2. it doesn't contribute to the business requirement
3. **your customer is not willing to pay for it**
```

### Short Paragraphs
1-3 sentences per paragraph. Use single-sentence paragraphs for punch:

```markdown
I don't appreciate that.
```

```markdown
Resist!
```

### Horizontal Rules as Section Breaks
Use `* * *` or `---` to separate major sections, creating breathing room in the narrative.

### Ending with Takeaways or Reflection
Close with either:
- A numbered takeaway list ("Remember your Takeaway: 1. seek help among your mates 2. a team wins over the lonely wolf")
- A philosophical reflection tying back to the opening
- A direct question to the reader ("What will you do?")
- A punchy closing line ("And that makes me irreplaceable.")

---

## Sentence-Level Style

### Mix Short and Long
Alternate between punchy fragments and flowing narrative sentences:

"It is active because you are deeply interested in getting anything that your partner is saying, so to put yourself in the best spot ever to utter an intelligent reply."

Followed by: "This is very tiresome and inefficient."

### Rhetorical Questions
Scatter them throughout to create dialogue with the reader:
- "So what? Why am I wasting all those efforts?"
- "Aren't you?"
- "You see where I am going with this, do you?"

### Parenthetical Humor
Use parentheses for asides, often humorous:
- "(to sleep at the office will save you commuting time, think about it)"
- "(yes, you have to use the good'ol Excel, Google Docs is way too advanced)"
- "(we still propagate most of it verbally, and we don't even realize the cost of it)"

### Italics for Inner Voice
Use italics when representing thoughts or internal monologue:
- *"What they'll think of me?"*
- *"It may be just a network error, I thought"*

---

## Recurring Markers & Phrases

- **"True story."** — Used as a deadpan aside after something absurd
- **"d'oh!"** / **"Well, d'oh!"** — Homer Simpson-style exclamation
- **"Dead simple."** — When emphasizing simplicity
- **Emoji use:** Sparingly but deliberately. Use 👉 for key points, 🤖 for AI quotes, 😎/😅/🧐 for emotional beats. More frequent in recent (2024-2025) posts. Never decorative.
- **Movie/book metaphors:** Matrix, 50 First Dates, Her, Napoleon quotes — weave pop culture into technical or philosophical arguments
- **"The bottom line is..."** — For wrapping up sections
- **Famous quotes as entry points:** Napoleon, Mark Twain, Andrej Karpathy — use quotes to launch into personal interpretation

---

## Technical Article Specifics

### Problem-Solution-Opinion Structure
For technical posts, follow this pattern:
1. State the problem from personal experience ("I used to write a docker-compose.yml like this...")
2. Show what goes wrong
3. Present solutions (often multiple, ranked: "The Dumb Way", "The Developer's Way", "The Docker Compose's Way")
4. End with opinion on which is best and why

### Code as Conversation
Introduce code blocks conversationally. Explain what they do in human terms before or after, not as formal documentation:

"Here is a simplistic implementation of an app that should be able to sum two integers:"

### Practical Over Theoretical
Always ground technical content in real projects and real problems. Never abstract for abstraction's sake.

---

## Personal/Life Article Specifics

### Story Arc
Personal articles follow a narrative arc:
1. Set the scene with specific details (time, place, who was there)
2. Build tension through the problem/challenge
3. Turn with a realization or outside help
4. Resolve with a lesson that's broadly applicable

### Named People
Reference real colleagues and family by first name: Johan, Vladimir, Maximilian, Silvia, Michele. This grounds stories in reality.

### Health/AFib Content
When discussing health topics, balance vulnerability with empowerment. The message is always: "This happened to me, here's what I learned, and here's what you can do."

---

## AI/Future-of-Work Article Specifics

### Balanced Perspective
Neither doom-and-gloom nor naive enthusiasm. Acknowledge AI's power while asserting human value:

"AI will not do everything for us. Agents will do an increasingly amount of small tasks... but the final word is ours. The human in the loop."

### Hands-On Demonstrations
When discussing AI tools, show actual interactions (ChatGPT conversations, Copilot screenshots). Don't theorize — demonstrate.

### The "Context" Theme
A recurring thesis: context is the bottleneck, not compute. Human judgment in gathering, curating, and providing context is where the value lies.

---

## Formatting Checklist

- [ ] Frontmatter: title, description, pubDate, heroImage, tags
- [ ] Import components as needed: `import Img from '../../../components/Img.astro';`
- [ ] Opening hook within first 2 sentences
- [ ] Blockquotes for key insights (at least 2-3 per article)
- [ ] Bold key phrases in every section
- [ ] Short paragraphs (1-3 sentences)
- [ ] At least one personal anecdote or real-world example
- [ ] Rhetorical question(s) to engage the reader
- [ ] Closing with takeaway, reflection, or direct question
- [ ] Horizontal rules between major sections
