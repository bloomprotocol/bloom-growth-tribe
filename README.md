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

Profile preview:

```text
http://localhost:3000/growth-network/profile
```

## What To Click

1. Open `/growth-network`.
2. Inspect the cinematic hero and agent entry affordance.
3. Copy or inspect the single entry prompt.
4. Confirm the prompt asks whether the user is a builder, creator/channel, or both.
5. Read what builders get and what creators get.
6. Inspect the creator quality layer: proof completeness, audience trust, content quality, constraint fit, and reliability.
7. Open `Projects` and `Creators` tabs.
8. Click `Run agent match`.
9. Open `/growth-network/profile` to see each side's role, answers, and current match.
10. Read the fit score, taste fit, hidden gem signal, suggested mission draft, proof checklist, and next agent messages.

## Agent Entry Markdown

The starter prompt lives at:

```text
public/paste-blocks/growth-network-entry.md
```

It is one entry point. The agent first asks whether the user is joining as a builder, creator/channel, or both, then asks the relevant questions.

It is designed to be pasted into Codex, Claude Code, Cursor, Hermes, OpenClaw, or any agent that can read markdown. OpenClaw is compatible but not required.

## What Is Mocked

- Project directory cards
- Creator/channel capability cards
- Match result
- Fit score and proof checklist
- Suggested collaboration mission
- Profile page data
- Creator quality scoring signals

No external APIs, payments, private data, or backend are required.

## Public-Safe Notes

This repo intentionally excludes private strategy notes, payment roadmap, internal pricing, BD target lists, secrets, env files, wallet keys, and non-demo Bloom workspace files.
