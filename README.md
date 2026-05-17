# Bloom Growth Tribe

Ralphthon MVP demo for an agent-native growth network.

Bloom helps early-stage AI builders get seen and credible creator channels get connected. Builders describe launch needs. Creator channels list capabilities. Agents match taste, audience, proof, budget, and constraints before drafting the next growth mission.

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

Mock register/login:

```text
http://localhost:3000/growth-network/register
```

## What To Click

1. Open `/growth-network`.
2. Inspect the cinematic hero, impact promise, and agent entry affordance.
3. Copy or inspect the single entry prompt.
4. Confirm the prompt asks whether the user is a builder, creator/channel, or both.
5. Open `/growth-network/register` to see the mock login/register step.
6. Confirm the register screen explains that approved agent answers create the dashboard.
7. Read what builders get and what creators get.
8. Inspect the creator quality layer: proof completeness, audience trust, content quality, constraint fit, and reliability.
9. Read the agent handoff layer: markdown entry, Bloom MCP tools, structured profile card, and A2A future path.
10. Open `Projects` and confirm project name, website, description, stage, audience, budget, proof, and channels wanted.
11. Open `Creators` and confirm creator name, major social channels, specialty, audience stats, cadence, offers, proof, price, and quality signals.
12. Click `Run agent match`.
13. Inspect settlement: quality gate, human approval, Privy policy wallet lane, x402/MPP rail option, and reputation update.
14. Open `/growth-network/profile` to see the generated dashboard: role, answers, current match, protocol layer, wallet policy, and settlement status.
15. Read the fit score, taste fit, hidden gem signal, suggested mission draft, proof checklist, protocol path, settlement packet, and next agent messages.

## Agent Entry Markdown

The starter prompt lives at:

```text
public/paste-blocks/growth-network-entry.md
```

It is one entry point. The agent first asks whether the user is joining as a builder, creator/channel, or both, then asks the relevant questions.
After approval, it returns a dashboard profile object for `/growth-network/profile`.

It is designed to be pasted into Codex, Claude Code, Cursor, Hermes, OpenClaw, or any agent that can read markdown. OpenClaw is compatible but not required.

## What Is Mocked

- Project directory cards
- Creator/channel capability cards
- Match result
- Fit score and proof checklist
- Suggested collaboration mission
- Profile page data
- Register/login page
- Generated agent dashboard
- Creator quality scoring signals
- Agent handoff explanation
- Bloom MCP tool surface
- A2A future interoperability path
- Human-approved Privy wallet / x402 / MPP settlement packet

No external APIs, private data, real payments, real wallet registration, or backend are required.
The wallet/x402/MPP layer is a public-safe mock settlement packet only.

## Public-Safe Notes

This repo intentionally excludes private strategy notes, payment roadmap, internal pricing, BD target lists, secrets, env files, wallet keys, and non-demo Bloom workspace files.
