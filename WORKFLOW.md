# WORKFLOW.md
> How to run a session. Follow this every time.
> The difference between a productive session and a messy one is usually this doc.

---

## Session start checklist

```bash
# 1. Name the session immediately
/rename [feature-name]

# 2. Surface assumptions before touching anything
/common-ground

# 3. Check current state
cat PLAN.md
git status
git log --oneline -5
```

---

## The four phases — never cross a boundary with a full context window

```
Research → Plan → Implement → Validate
```

Run `/compact` or `/clear` between phases.
Run `/context-check` if a session has been running for more than 30 mins.

### Phase 1 — Research
- Read relevant files, understand current state
- Do not write any code
- Tools: Read, Grep, Glob

### Phase 2 — Plan
- Run `/plan [feature]` — get a written, approved plan
- For uncertain approaches: `/parallel-build 2` to get competing implementations
- Do not implement until plan is explicitly approved

### Phase 3 — Implement
- Work in small, verified steps
- Commit after each stable state — not just at the end
- TypeScript check runs automatically on every file write (via hooks)
- Run `/token-audit components/[folder]` after component work

### Phase 4 — Validate
- Run `/qa-sweep` for full quality sweep
- Run parallel subagents for a11y + token audit simultaneously:
  `Run a11y-auditor and token-auditor as parallel subagents`
- Run `/deploy-check` before any merge to main

---

## When to use parallel worktrees

Use `/parallel-build N` when:
- The best architectural approach is genuinely unclear
- You want to compare two different component structures
- A feature is large enough that independent implementations are worth comparing

```bash
./scripts/parallel-worktrees.sh [feature-name] 2
# Open each in a separate terminal
# Run same spec in each
# Compare, pick winner, merge
./scripts/cleanup-worktrees.sh [feature-name]
```

---

## Context window rules

| Usage | Action |
|---|---|
| < 40% | Continue normally |
| 40–60% | Finish current task, save decisions, do not start new feature |
| > 60% | Run /compact before continuing — output quality degrades here |
| New feature | Always /clear first — do not carry stale context |

---

## Commit discipline

```bash
# After each stable, working state — not just end of session
git add -A
git commit -m "[type]: [what changed and why]"

# Types: feat / fix / design / tokens / refactor / a11y / docs
# Example: "tokens: add elevation semantic layer and wire to tailwind"
# Example: "feat: WaitlistForm with validation and rate limiting"
```

---

## Before any deploy

1. `/deploy-check` — full pre-deploy verification
2. `/code-review` — parallel agent PR review
3. Confirm Sentry, Analytics, OG tags, env vars
4. Lighthouse 90+ on production URL

---

## Session end

```bash
# Save any decisions made
# Update PLAN.md with what was completed and what's next
# Commit if stable
git commit -m "docs: update PLAN.md after [session summary]"
```

---

## CLAUDE.md — update before closing every session

Claude Code has no memory between sessions. The only thread of continuity is CLAUDE.md.

Before ending any session, update the **Current Focus** block:
```
Working on: [what you completed or are mid-way through]
Avoid touching: [files that are in a fragile state]
Blocked by: [anything blocking the next session]
```

This takes 30 seconds. Without it, the next session starts blind.

---

## Testing discipline

Write tests alongside features — not after the sprint.

```bash
# After building a new utility or validation
npm run test                    # confirm unit tests pass

# After completing a feature
npm run test:e2e               # confirm critical paths work

# Before any PR
npm run test:all               # full suite
```

Add a /test slash command prompt to SKILLS.md as you discover good test patterns.
