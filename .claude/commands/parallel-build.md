# /parallel-build

Spawn $ARGUMENTS parallel worktree implementations of the current feature.
Usage: /parallel-build 3

## What this does

Creates N independent Claude sessions, each implementing the same spec in isolation.
LLM non-determinism is a feature here — you get N valid approaches to compare.

## Setup

```bash
# Creates worktrees: .claude/worktrees/[feature]-1, -2, -3
claude --worktree [feature]-1
claude --worktree [feature]-2
claude --worktree [feature]-3
```

## Instructions for each worktree agent

Each agent receives the same spec and works independently.
Do not coordinate between agents.
Each agent should:
1. Read CLAUDE.md and PLAN.md for context
2. Implement the feature to full production standard
3. Run type-check and lint before completing
4. Write a brief summary: approach taken, trade-offs, token count

## After all agents complete

Compare implementations:
- Which approach is cleanest architecturally?
- Which uses the fewest tokens / lines for the same result?
- Which handles edge cases most thoroughly?
- Which is most aligned with the design system?

Recommend the winner. Merge it to the working branch.
Clean up losing worktrees.
