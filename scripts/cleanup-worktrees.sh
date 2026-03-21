#!/usr/bin/env bash
# cleanup-worktrees.sh
# Usage: ./scripts/cleanup-worktrees.sh <feature-name>
# Removes all worktrees for a feature after picking the winner

set -e

FEATURE=${1:-"feature"}
BASE_DIR=".claude/worktrees"

echo "🧹 Cleaning up worktrees for: $FEATURE"
echo ""

for DIR in ${BASE_DIR}/${FEATURE}-*/; do
  if [ -d "$DIR" ]; then
    BRANCH=$(git -C "$DIR" rev-parse --abbrev-ref HEAD 2>/dev/null || echo "unknown")
    echo "Removing: $DIR (branch: $BRANCH)"
    git worktree remove "$DIR" --force 2>/dev/null || rm -rf "$DIR"
    git branch -D "$BRANCH" 2>/dev/null || true
  fi
done

echo ""
echo "✅ Worktrees cleaned up"
