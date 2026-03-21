#!/usr/bin/env bash
# parallel-worktrees.sh
# Usage: ./scripts/parallel-worktrees.sh <feature-name> <num-agents>
# Creates N git worktrees for parallel Claude Code sessions

set -e

FEATURE=${1:-"feature"}
COUNT=${2:-2}
BASE_DIR=".claude/worktrees"

echo "🌿 Creating $COUNT parallel worktrees for: $FEATURE"
echo ""

mkdir -p $BASE_DIR

for i in $(seq 1 $COUNT); do
  BRANCH="worktree-${FEATURE}-${i}"
  DIR="${BASE_DIR}/${FEATURE}-${i}"

  if [ -d "$DIR" ]; then
    echo "⚠️  Worktree $DIR already exists — skipping"
    continue
  fi

  git worktree add -b "$BRANCH" "$DIR"
  echo "✅ Created: $DIR (branch: $BRANCH)"
done

echo ""
echo "─────────────────────────────────────"
echo "Open each in a separate terminal:"
for i in $(seq 1 $COUNT); do
  echo "  Terminal $i: cd ${BASE_DIR}/${FEATURE}-${i} && claude"
done
echo ""
echo "When done, run: ./scripts/cleanup-worktrees.sh $FEATURE"
