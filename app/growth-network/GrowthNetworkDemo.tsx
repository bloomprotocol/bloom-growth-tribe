'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './GrowthNetworkDemo.module.css';
import {
  creatorDirectory,
  creatorQualityRubric,
  mcpTools,
  projectDirectory,
  protocolLayers,
  settlementFlow,
  settlementPacket,
  walletGuidance,
} from './data';

type TabId = 'entry' | 'projects' | 'creators';

const entryPrompt = `You are Codex acting as the entry agent for Bloom Growth Tribe.

Goal: help the user join an agent-native growth network as either a builder or a creator/channel.

First ask exactly one routing question:
"Are you joining as a builder, a creator/channel, or both?"

If the user is a builder, collect or confirm:
- project name
- website
- project category
- what the builder wants to promote
- target audience
- launch goal
- approved claims
- forbidden claims
- preferred channels
- budget range
- settlement preference: manual invoice, human-approved Privy wallet, x402, MPP, or undecided
- proof required
- preferred creator style
- examples of creator posts they like
- tone preference: technical, founder-story, meme-native, educational, product-led
- audience trust preference: big reach, niche credibility, high-quality writing, community trust

Then respond in clean numbered steps only:

Step 1: Check product context
- Confirm project name, website, category, target audience, launch goal, approved claims, forbidden claims, and budget.
- Ask for missing fields if needed.

Step 2: Capture taste and channel preference
- Summarize preferred creator style, example posts the builder likes, tone preference, and audience trust preference.

Step 3: Prepare Bloom match request
- Output a structured match request JSON.
- Include preferred settlement rail and whether a Privy wallet/x402/MPP packet is allowed.
- Ask the builder for approval before sending, listing, registering a wallet, or spending anything.

If the user is a creator/channel, collect or confirm:
- creator/channel name
- platform: X, TikTok, newsletter, blog, community, or other
- handle / URL
- follower or subscriber stats
- average reach or engagement if known
- audience description
- accepted formats: single post, thread, short video, newsletter blurb, bundle, etc.
- price range
- preferred project categories
- blocked project categories
- products or builders they personally like
- examples of products they would promote even at a lower price
- deal preference: paid only, lower price for high-potential products, bundle deal, rev-share optional
- proof they can provide: URL, screenshot, timestamp, post ID, archive link
- settlement preference: manual invoice, human-approved Privy wallet, x402, MPP, or undecided

Then respond in clean numbered steps only:

Step 1: Check channel context
- Confirm channel name, platform, handle/URL, follower stats, reach/engagement, and audience.

Step 2: Package offerings and preferences
- Summarize accepted formats, price range, preferred project categories, blocked categories, taste preferences, and deal preference.

Step 3: Register capability card
- Output a structured creator capability JSON.
- Include settlement capability and approval constraints.
- Ask the creator for approval before listing, registering a wallet, accepting payment, or accepting any deal.

If the user is both, complete the builder steps first, then the creator steps.

If Bloom MCP tools are available, use them only after approval:
1. list_projects
2. list_creators
3. score_match
4. create_match_packet
5. prepare_settlement_packet

Never list, send, spend, accept, publish, register a wallet, or release funds without explicit approval.`;

const builderBenefits = [
  'A structured launch brief your agent can reuse',
  'Creator matches based on taste, proof, audience, and constraints',
  'A suggested collaboration package and first outreach message',
];

const creatorBenefits = [
  'A capability card that describes the channel clearly',
  'Projects filtered by category, taste, proof rules, and deal preference',
  'A safer way to accept small deals without manual brokerage overhead',
];

const impactItems = [
  {
    metric: 'Builders',
    title: 'Get seen before brokerage makes sense.',
    body: 'Early-stage AI builders turn a rough launch need into a brief that credible creator channels can evaluate.',
  },
  {
    metric: 'Creators',
    title: 'Get connected to projects that fit.',
    body: 'Creators list taste, audience, proof, and constraints so agents bring better-fit launches instead of cold noise.',
  },
  {
    metric: 'Agents',
    title: 'Make small deals operational.',
    body: 'Structured context lets agents compare fit, draft the mission, and prepare the next step without expensive manual brokerage.',
  },
];

const agentHandoffSteps = [
  {
    title: 'Markdown entry',
    body: 'The user gives their agent the Bloom markdown. The agent asks whether they are a builder, creator/channel, or both.',
  },
  {
    title: 'Bloom MCP',
    body: 'The agent can call list_projects, list_creators, score_match, create_match_packet, and prepare_settlement_packet.',
  },
  {
    title: 'Profile card',
    body: 'The agent turns answers into a builder brief or creator capability card with approval gates.',
  },
  {
    title: 'A2A later',
    body: 'When builders and creators run live agents, A2A agent cards can let them negotiate availability, proof, and mission updates.',
  },
];

const mockMatch = {
  creator: 'DevRel Fieldnotes',
  project: 'Signal Garden',
  fitScore: 92,
  audienceFit: 'Technical founders and DevRel operators already care about agent-readable docs.',
  styleFit: 'Educational, proof-first writing matches the project’s trust requirement.',
  tasteFit: 'The channel prefers developer utility and restrained claims.',
  budgetFit: '$500 starting range fits inside the $500-$900 launch budget.',
  proofFit: 'Permalink, community screenshot, and timestamp satisfy the proof checklist.',
  hiddenGemSignal: 'Smaller reach, higher credibility: strong mid-tail fit for a technical category.',
  whyItFits:
    'Bloom is selecting for taste, audience trust, proof format, and constraints. Reach is useful, but not the main reason this pairing works.',
  risks: ['Avoid broad AI productivity claims.', 'Keep examples grounded in docs and agent parsing.', 'Confirm community post rules before publishing.'],
  package: 'One technical note plus one community post, with a 48-hour reply summary.',
  mission:
    'Draft a practical fieldnote showing how a small team turns messy launch docs into an agent-readable growth brief, then invite readers to compare their own docs against the checklist.',
  checklist: ['Public permalink', 'Timestamped screenshot', 'Copy approved by builder', 'Claim check completed', 'Reply summary after 48 hours'],
  builderNext:
    'Approve the match request JSON, confirm forbidden claims, and send one product screenshot plus one best-user quote.',
  creatorNext:
    'Approve the capability card, confirm format and price, and share one sample technical note with proof.',
  protocolPath:
    'MVP: markdown and public HTML. Demo layer: Bloom MCP tool calls. Future: A2A agent cards for live builder and creator agents.',
  settlement:
    'Prepare a human-approved settlement packet: Privy policy wallet, x402, or MPP rail; 0.01 USDC proof payment; capped recipient; no autonomous release.',
};

function copyText(text: string) {
  if (typeof navigator === 'undefined' || !navigator.clipboard) return;
  void navigator.clipboard.writeText(text);
}

export default function GrowthNetworkDemo() {
  const [activeTab, setActiveTab] = useState<TabId>('entry');
  const [matchVisible, setMatchVisible] = useState(false);

  return (
    <main className={styles.page}>
      <section className={styles.hero} aria-labelledby="growth-network-title">
        <div className={styles.heroImage} />
        <div className={styles.heroVeil} />
        <nav className={styles.nav} aria-label="Growth network navigation">
          <a className={styles.brand} href="#top" aria-label="Bloom Growth Tribe home">
            <span className={styles.brandMark}>B</span>
            <span>Bloom Growth Tribe</span>
          </a>
          <div className={styles.navLinks}>
            <a href="#agent-entry">Agent Entry</a>
            <a href="#projects">Projects</a>
            <a href="#creators">Creators</a>
            <a href="#match">Match</a>
            <Link href="/growth-network/register">Register</Link>
          </div>
        </nav>

        <div className={styles.heroContent} id="top">
          <div className={styles.heroCopy}>
            <p className={styles.kicker}>Growth access for early AI builders</p>
            <h1 id="growth-network-title">Find growth partners your agent can understand.</h1>
            <p className={styles.subhead}>
              Bloom helps early-stage AI builders get seen and credible creator channels get connected.
              Agents turn launch briefs and channel profiles into quality-scored matches, mission drafts,
              and human-approved next steps.
            </p>
            <div className={styles.heroActions}>
              <a className={styles.primaryCta} href="#match" onClick={() => setMatchVisible(true)}>
                Run agent match
              </a>
              <button className={styles.secondaryCta} type="button" onClick={() => copyText(entryPrompt)}>
                Copy entry prompt
              </button>
              <Link className={styles.secondaryLink} href="/growth-network/register">
                Register / login
              </Link>
              <Link className={styles.secondaryLink} href="/growth-network/profile">
                View dashboard
              </Link>
            </div>
          </div>

          <aside className={styles.entryConsole} aria-label="Agent entry preview">
            <div className={styles.consoleTop}>
              <span>Paste into Codex or your agent</span>
              <a href="/paste-blocks/growth-network-entry.md">Markdown entry</a>
            </div>
            <div className={styles.consoleBody}>
              <p>1. Choose builder or creator.</p>
              <p>2. Let Bloom MCP score fit when approved.</p>
              <p>3. Prepare match and settlement packets.</p>
            </div>
            <div className={styles.runtimeLine}>
              Codex first-class. Also compatible with Claude Code, Cursor, Hermes, OpenClaw, and markdown-reading agents.
            </div>
          </aside>
        </div>
      </section>

      <section className={styles.impactSection} aria-labelledby="impact-title">
        <div className={styles.impactLead}>
          <p className={styles.kicker}>Hackathon Impact</p>
          <h2 id="impact-title">Give small AI launches a real distribution path.</h2>
          <p>
            Manual brokerage is too expensive for small creator deals. Bloom makes the first match
            legible enough for agents to compare, prepare, and move forward with human approval.
          </p>
        </div>
        <div className={styles.impactGrid}>
          {impactItems.map((item) => (
            <article key={item.metric}>
              <span>{item.metric}</span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.entrySection} id="agent-entry" aria-labelledby="agent-entry-title">
        <div className={styles.sectionHeader}>
          <p className={styles.kicker}>Agent Entry</p>
          <h2 id="agent-entry-title">One entry point. Your agent routes the rest.</h2>
          <p>Paste the markdown into Codex or your agent. It asks whether you are a builder, a creator/channel, or both.</p>
        </div>
        <PromptPanel title="Bloom Growth Tribe entry prompt" prompt={entryPrompt} />
      </section>

      <section className={styles.benefitsSection} aria-labelledby="benefits-title">
        <div className={styles.sectionHeader}>
          <p className={styles.kicker}>Why Join</p>
          <h2 id="benefits-title">Builders get clarity. Creators get fit.</h2>
        </div>
        <div className={styles.benefitGrid}>
          <article>
            <p className={styles.cardLabel}>For builders</p>
            <h3>Turn a launch need into a matchable brief.</h3>
            <ul>{builderBenefits.map((item) => <li key={item}>{item}</li>)}</ul>
          </article>
          <article>
            <p className={styles.cardLabel}>For creators</p>
            <h3>Make your channel legible to matching agents.</h3>
            <ul>{creatorBenefits.map((item) => <li key={item}>{item}</li>)}</ul>
          </article>
        </div>
      </section>

      <section className={styles.qualitySection} aria-labelledby="quality-title">
        <div className={styles.sectionHeader}>
          <p className={styles.kicker}>Creator Quality Layer</p>
          <h2 id="quality-title">Bloom checks fit before it checks reach.</h2>
          <p>
            The agent looks for public proof, audience trust, content taste, and claim discipline.
            A smaller channel can win when the quality signals are stronger.
          </p>
        </div>
        <div className={styles.qualityGrid}>
          {creatorQualityRubric.map((item, index) => (
            <article key={item.label}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{item.label}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.handoffSection} aria-labelledby="handoff-title">
        <div className={styles.sectionHeader}>
          <p className={styles.kicker}>Agent Handoff</p>
          <h2 id="handoff-title">MCP makes matching credible now. A2A makes agents find agents later.</h2>
          <p>
            The MVP stays runnable through markdown and public HTML. Bloom MCP is the hackathon tool layer
            an agent can call to inspect listings, score fit, and prepare packets. A2A is the future layer
            for live builder and creator agents to talk to each other.
          </p>
        </div>
        <div className={styles.handoffGrid}>
          {agentHandoffSteps.map((step) => (
            <article key={step.title}>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </article>
          ))}
        </div>
        <div className={styles.protocolStack}>
          {protocolLayers.map((layer) => (
            <article key={layer.label}>
              <span>{layer.status}</span>
              <h3>{layer.label}</h3>
              <p>{layer.description}</p>
            </article>
          ))}
        </div>
        <div className={styles.mcpConsole} aria-label="Bloom MCP tool surface">
          <div>
            <p className={styles.kicker}>Bloom MCP Tool Surface</p>
            <h3>Tools an agent can call</h3>
          </div>
          <dl>
            {mcpTools.map((tool) => (
              <div key={tool.name}>
                <dt>{tool.name}</dt>
                <dd>{tool.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className={styles.settlementSection} aria-labelledby="settlement-title">
        <div className={styles.sectionHeader}>
          <p className={styles.kicker}>Settlement Layer</p>
          <h2 id="settlement-title">Quality decides eligibility. Humans approve settlement.</h2>
          <p>
            Agents prepare the deal packet, proof checklist, and settlement packet. For the hackathon,
            Bloom can show a Privy policy wallet plus x402 or MPP rail, but release stays human-approved.
          </p>
        </div>
        <div className={styles.settlementGrid}>
          {settlementFlow.map((step) => (
            <article key={step.label}>
              <h3>{step.label}</h3>
              <p>{step.description}</p>
            </article>
          ))}
        </div>
        <div className={styles.walletNote}>
          <span>Wallet stance</span>
          <p>{walletGuidance.mvp} {walletGuidance.future}</p>
        </div>
        <div className={styles.settlementPacket}>
          <div>
            <p className={styles.kicker}>Prepared Settlement Packet</p>
            <h3>{settlementPacket.rail}</h3>
            <p>{settlementPacket.amount}</p>
            <p>{settlementPacket.recipient}</p>
          </div>
          <div>
            <span>Policy controls</span>
            <ul>{settlementPacket.policy.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
          <div>
            <span>Lifecycle</span>
            <ol>{settlementPacket.lifecycle.map((item) => <li key={item}>{item}</li>)}</ol>
          </div>
        </div>
      </section>

      <section className={styles.directory} aria-labelledby="directory-title">
        <div className={styles.sectionHeader}>
          <p className={styles.kicker}>Public Directory</p>
          <h2 id="directory-title">Live listings for agents to inspect.</h2>
        </div>
        <div className={styles.tabs} role="tablist" aria-label="Growth network directory tabs">
          {[
            ['entry', 'Agent Entry'],
            ['projects', 'Projects'],
            ['creators', 'Creators'],
          ].map(([id, label]) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={activeTab === id}
              className={activeTab === id ? styles.activeTab : ''}
              onClick={() => setActiveTab(id as TabId)}
            >
              {label}
            </button>
          ))}
        </div>

        {activeTab === 'entry' && (
          <div className={styles.agentBrief}>
            <div>
              <h3>Agent-readable entry point</h3>
              <p>
                The markdown starter routes the user first, then asks the right questions for builders,
                creators, or both. It works anywhere an agent can read markdown and return numbered steps.
              </p>
            </div>
            <a className={styles.textLink} href="/paste-blocks/growth-network-entry.md">
              Open entry markdown
            </a>
          </div>
        )}

        {activeTab === 'projects' && (
          <div className={styles.listPanel} id="projects">
            {projectDirectory.map((project, index) => (
              <article className={styles.listRow} key={project.name}>
                <div className={styles.rowIdentity}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <div>
                    <p className={styles.cardLabel}>{project.category} · {project.stage}</p>
                    <h3>{project.name}</h3>
                    <a className={styles.cardLink} href={project.website}>{project.website}</a>
                    <p>{project.tagline}</p>
                  </div>
                </div>
                <div className={styles.rowMain}>
                  <p>{project.description}</p>
                  <dl>
                  <div>
                    <dt>Audience</dt>
                    <dd>{project.targetAudience}</dd>
                  </div>
                  <div>
                    <dt>Style</dt>
                    <dd>{project.preferredStyle.join(', ')}</dd>
                  </div>
                  <div>
                    <dt>Budget</dt>
                    <dd>{project.budgetRange}</dd>
                  </div>
                  <div>
                    <dt>Proof</dt>
                    <dd>{project.proofRequired}</dd>
                  </div>
                  <div>
                    <dt>Channels wanted</dt>
                    <dd>{project.channelsWanted.join(', ')}</dd>
                  </div>
                  </dl>
                </div>
                <button type="button" onClick={() => setMatchVisible(true)}>
                  Ask agent to match
                </button>
              </article>
            ))}
          </div>
        )}

        {activeTab === 'creators' && (
          <div className={styles.listPanel} id="creators">
            {creatorDirectory.map((creator, index) => (
              <article className={styles.listRow} key={creator.name}>
                <div className={styles.rowIdentity}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <div>
                    <p className={styles.cardLabel}>{creator.platform} · quality {creator.qualityScore}/100</p>
                    <h3>{creator.name}</h3>
                    <p>{creator.specialty}</p>
                    <div className={styles.channelLinks}>
                      {creator.socialLinks.map((link) => (
                        <a href={link.url} key={link.label}>{link.label}</a>
                      ))}
                    </div>
                  </div>
                </div>
                <div className={styles.rowMain}>
                  <dl>
                  <div>
                    <dt>Audience</dt>
                    <dd>{creator.audience}</dd>
                  </div>
                  <div>
                    <dt>Stats</dt>
                    <dd>{creator.audienceStats}</dd>
                  </div>
                  <div>
                    <dt>Cadence</dt>
                    <dd>{creator.cadence}</dd>
                  </div>
                  <div>
                    <dt>Formats</dt>
                    <dd>{creator.acceptedFormats.join(', ')}</dd>
                  </div>
                  <div>
                    <dt>Proof</dt>
                    <dd>{creator.proofAvailable}</dd>
                  </div>
                  <div>
                    <dt>Starts</dt>
                    <dd>{creator.startingRange}</dd>
                  </div>
                  <div>
                    <dt>Taste</dt>
                    <dd>{creator.tastePreferences.join(', ')}</dd>
                  </div>
                  <div>
                    <dt>Sample</dt>
                    <dd>{creator.sampleWork}</dd>
                  </div>
                  <div>
                    <dt>Quality</dt>
                    <dd>{creator.qualityScore}/100 · {creator.qualitySignals.join(', ')}</dd>
                  </div>
                  </dl>
                </div>
                <button type="button" onClick={() => setMatchVisible(true)}>
                  Match with project
                </button>
              </article>
            ))}
          </div>
        )}
      </section>

      <section className={styles.matchSection} id="match" aria-labelledby="match-title">
        <div className={styles.matchIntro}>
          <p className={styles.kicker}>Agent Match Result</p>
          <h2 id="match-title">Bloom matches more than reach.</h2>
          <p>Taste, audience, proof, constraints, and founder/creator preference shape the recommendation.</p>
          <button type="button" className={styles.primaryCta} onClick={() => setMatchVisible(true)}>
            Run agent match
          </button>
        </div>

        {matchVisible ? (
          <article className={styles.matchResult} aria-live="polite">
            <div className={styles.matchHeader}>
              <div>
                <p className={styles.cardLabel}>Best match</p>
                <h3>{mockMatch.project} × {mockMatch.creator}</h3>
              </div>
              <div className={styles.score}>{mockMatch.fitScore}<span>/100</span></div>
            </div>
            <div className={styles.fitGrid}>
              {[
                ['Audience fit', mockMatch.audienceFit],
                ['Style fit', mockMatch.styleFit],
                ['Taste fit', mockMatch.tasteFit],
                ['Budget fit', mockMatch.budgetFit],
                ['Proof fit', mockMatch.proofFit],
                ['Hidden gem signal', mockMatch.hiddenGemSignal],
              ].map(([label, value]) => (
                <div key={label}>
                  <span>{label}</span>
                  <p>{value}</p>
                </div>
              ))}
            </div>
            <div className={styles.recommendation}>
              <h4>Why it fits</h4>
              <p>{mockMatch.whyItFits}</p>
              <h4>Risks / constraints</h4>
              <ul>{mockMatch.risks.map((risk) => <li key={risk}>{risk}</li>)}</ul>
              <h4>Suggested collaboration package</h4>
              <p>{mockMatch.package}</p>
              <h4>Suggested mission draft</h4>
              <p>{mockMatch.mission}</p>
              <h4>Proof checklist</h4>
              <ul>{mockMatch.checklist.map((item) => <li key={item}>{item}</li>)}</ul>
              <h4>Next messages</h4>
              <p><strong>Builder agent:</strong> {mockMatch.builderNext}</p>
              <p><strong>Creator agent:</strong> {mockMatch.creatorNext}</p>
              <h4>Protocol path</h4>
              <p>{mockMatch.protocolPath}</p>
              <h4>Settlement packet</h4>
              <p>{mockMatch.settlement}</p>
            </div>
          </article>
        ) : (
          <div className={styles.matchPlaceholder}>
            <p>Click Run agent match to reveal the structured recommendation a judge should inspect.</p>
          </div>
        )}
      </section>

      <section className={styles.profileTeaser} aria-labelledby="profile-title">
        <div>
          <p className={styles.kicker}>Generated Dashboard</p>
          <h2 id="profile-title">Registration turns approved answers into an agent dashboard.</h2>
          <p>For the MVP this is public-safe mock auth. A real version would save approved answers and generate the same dashboard after login.</p>
        </div>
        <div className={styles.teaserActions}>
          <Link className={styles.secondaryDark} href="/growth-network/register">
            Register / login
          </Link>
          <Link className={styles.primaryCta} href="/growth-network/profile">
            Open dashboard
          </Link>
        </div>
      </section>
    </main>
  );
}

function PromptPanel({ title, prompt }: { title: string; prompt: string }) {
  return (
    <article className={styles.promptPanel}>
      <div className={styles.promptPanelTop}>
        <h3>{title}</h3>
        <button type="button" onClick={() => copyText(prompt)}>
          Copy
        </button>
      </div>
      <pre>{prompt}</pre>
    </article>
  );
}
