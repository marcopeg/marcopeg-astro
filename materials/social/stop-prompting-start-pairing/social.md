# Social Distribution Draft: Stop Prompting, Start Pairing

Historical working package. The current LinkedIn copy lives beside the article in `src/content/posts/2026/it-started-with-a-quick-checkup-how-to-talk-to-an-ai-in-production.linkedin.txt`, with its first comment in `.linkedin-comment.txt`. Recheck facts against the current article before reusing any draft below, including the X options.

- **Article**: Stop Prompting, Start Pairing: Securing a Live VPS with AI
- **Slug**: `stop-prompting-start-pairing`
- **Canonical URL**: `https://marcopeg.com/it-started-with-a-quick-checkup-how-to-talk-to-an-ai-in-production/`
- **First-Party Short URL**: `https://marcopeg.com/s/vps`
- **Generated**: 2026-10-06

---

## 💼 LinkedIn Package

### Post Copy:
Most developers treat AI like an intern writing code in a sandbox. Last weekend, I gave an agent root access to an active production VPS hosting 30 Docker services to run "a quick checkup."

What started as a routine inspection quickly turned into a live hardening session: hundreds of unauthorized SSH attempts flooding the logs, outdated packages, an open root login, and non-standard sudo policies. 

Instead of copying commands from a chat window or pasting scripts blind, we pair-engineered the entire fix in real time. We established an immutable fallback user, migrated to strict SSH key authentication, tightened sudoers rules, configured fail2ban, and closed the doors without dropping a single active container or locking ourselves out.

Treating AI as a pair-engineering partner rather than a prompt-and-pray generator changes the dynamics completely. You stay in control of architecture, constraints, and verification; the agent handles exploration, terminal execution, and state verification.

I documented the complete step-by-step experience, the friction points, and the pairing rules we followed to safely harden a live server. The link to the full write-up is in the first comment.

#DevOps #CloudEngineering #SoftwareArchitecture #AI #SysAdmin

---

### First Comment:
Here is the complete walkthrough, pairing rules, and terminal transcript:
https://marcopeg.com/s/vps

How do you currently navigate AI permissions when touching live infrastructure?

---

## 🐦 X (Twitter) Package

### Single Post Option A (258 / 280 chars):
Pair-engineering on a live VPS with AI:

We hardened a production server running 30 Docker services. SSH keys only, locked sudoers, emergency fallback user, fail2ban.

Zero downtime. Zero lockouts.

Full story & rules:
https://marcopeg.com/s/vps

#DevOps #AI

---

### Single Post Option B (255 / 280 chars):
Pairing with an AI on a live production VPS is very different from sandbox prompting.

Hardened an active server running 30 Docker containers: SSH keys only, emergency fallback user, fail2ban. Zero lockouts.

Rules: https://marcopeg.com/s/vps

#DevOps #AI
