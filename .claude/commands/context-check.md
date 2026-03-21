# /context-check

Check current context window usage and advise on whether to compact or split the session.

## Instructions

Estimate how much of the context window is currently used.

If under 40%: continue normally.

If 40–60%:
- Flag that we are approaching the quality degradation threshold
- Suggest saving any in-progress decisions to DECISIONS.md
- Recommend completing the current task before starting anything new

If over 60%:
- Stop and recommend running /compact before continuing
- List what should be saved to DECISIONS.md or PLAN.md before compacting
- Warn that output quality degrades significantly above this threshold

The 60% rule: above 60% context, Claude Code output quality degrades measurably.
Split complex work into Research → Plan → Implement → Validate phases.
Clear context between phases with /compact.
Never cross a phase boundary with a full context window.
