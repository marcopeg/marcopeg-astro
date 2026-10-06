#!/usr/bin/env node

/**
 * Ensures Claude compatibility symlinks point to canonical agent sources:
 * - CLAUDE.md       -> AGENTS.md
 * - .claude/skills  -> ../.agents/skills
 *
 * All canonical instructions and skills live in AGENTS.md and .agents/skills/.
 */

import { symlink, lstat, rm, mkdir } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const CLAUDE_MD = join(ROOT, "CLAUDE.md");
const CLAUDE_DIR = join(ROOT, ".claude");
const CLAUDE_SKILLS = join(ROOT, ".claude", "skills");
const CURSOR_DIR = join(ROOT, ".cursor");

async function ensureSymlink(target, linkPath) {
  try {
    const stat = await lstat(linkPath);
    if (stat.isSymbolicLink()) {
      return;
    }
    await rm(linkPath, { recursive: true, force: true });
  } catch (err) {
    if (err.code !== "ENOENT") throw err;
  }
  await symlink(target, linkPath);
  console.log(`  ✓ Linked ${linkPath} -> ${target}`);
}

async function sync() {
  // 1. CLAUDE.md -> AGENTS.md
  await ensureSymlink("AGENTS.md", CLAUDE_MD);

  // 2. .claude/skills -> ../.agents/skills
  await mkdir(CLAUDE_DIR, { recursive: true });
  await ensureSymlink("../.agents/skills", CLAUDE_SKILLS);

  // 3. Clean up legacy .cursor directory if present
  try {
    await rm(CURSOR_DIR, { recursive: true, force: true });
    console.log(`  ✓ Removed legacy .cursor directory`);
  } catch {}

  console.log(`\nSkills and agent instructions cleanly synced via symlinks.`);
}

sync().catch((err) => {
  console.error("Sync failed:", err);
  process.exit(1);
});
