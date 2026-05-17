# Bloom Growth Tribe

Ralphthon MVP demo for an agent-native growth network.

Builders describe launch needs. Creator channels list capabilities. Agents match taste, audience, proof, budget, and constraints before drafting the next growth mission.

## Run Locally

```bash
npm install
npm run dev
```

Demo route:

```text
http://localhost:3000/growth-network
```

## What To Click

1. Open `/growth-network`.
2. Inspect the cinematic hero and agent entry affordance.
3. Copy or inspect `Join as builder`.
4. Copy or inspect `Join as creator/channel`.
5. Open `Projects` and `Creators` tabs.
6. Click `Run agent match`.
7. Read the fit score, taste fit, hidden gem signal, suggested mission draft, proof checklist, and next agent messages.

## Agent Entry Markdown

The starter prompt lives at:

```text
public/paste-blocks/growth-network-entry.md
```

It is designed to be pasted into Codex, Claude Code, Cursor, Hermes, OpenClaw, or any agent that can read markdown. OpenClaw is compatible but not required.

## What Is Mocked

- Project directory cards
- Creator/channel capability cards
- Match result
- Fit score and proof checklist
- Suggested collaboration mission

No external APIs, payments, private data, or backend are required.

## Public-Safe Notes

This repo intentionally excludes private strategy notes, payment roadmap, internal pricing, BD target lists, secrets, env files, wallet keys, and non-demo Bloom workspace files.
