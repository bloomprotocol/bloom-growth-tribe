import type { Metadata } from 'next';
import Link from 'next/link';
import { creatorDirectory, demoProfiles, projectDirectory } from '../data';
import styles from './profile.module.css';

export const metadata: Metadata = {
  title: 'Agent Dashboard — Bloom Growth Tribe',
  description:
    'Public-safe mock dashboard generated from Bloom Growth Tribe agent onboarding answers.',
};

const builder = demoProfiles.builder;
const creator = demoProfiles.creator;
const matchedCreator = creatorDirectory.find((item) => item.name === builder.matchedWith) ?? creatorDirectory[2];
const matchedProject = projectDirectory.find((item) => item.name === creator.matchedWith) ?? projectDirectory[1];

const builderStats = [
  ['Fit score', '92'],
  ['Proof ready', '5/5'],
  ['Budget', '$500-$900'],
  ['Status', 'Approval'],
];

const creatorStats = [
  ['Quality', `${matchedCreator.qualityScore}`],
  ['Reach', '9K'],
  ['Formats', '3'],
  ['Starts', '$500'],
];

const missionRows = [
  {
    name: matchedCreator.name,
    role: 'Matched creator',
    score: '92',
    status: 'Mission draft ready',
    proof: matchedCreator.proofAvailable,
  },
  {
    name: matchedProject.name,
    role: 'Matched project',
    score: '92',
    status: 'Creator acceptance needed',
    proof: matchedProject.proofRequired,
  },
  {
    name: 'Privy / x402 / MPP',
    role: 'Settlement packet',
    score: '0.01',
    status: 'Human approval only',
    proof: 'Capped symbolic proof payment, no autonomous release',
  },
];

export default function GrowthNetworkProfilePage() {
  return (
    <main className={styles.page}>
      <section className={styles.dashboard} aria-label="Bloom Growth Tribe agent dashboard">
        <nav className={styles.topbar}>
          <Link href="/growth-network">Bloom Growth Tribe</Link>
          <div>
            <Link href="/growth-network/register">Register</Link>
            <Link href="/paste-blocks/growth-network-entry.md">Entry markdown</Link>
            <Link href="/growth-network">Directory</Link>
          </div>
        </nav>

        <header className={styles.profileHeader}>
          <div className={styles.avatar} aria-hidden="true">SG</div>
          <div className={styles.identity}>
            <p>Agent dashboard</p>
            <h1>{builder.displayName}</h1>
            <span>{builder.role} profile generated from approved onboarding answers</span>
          </div>
          <div className={styles.headerAction}>
            <span>Profile status</span>
            <strong>Ready for match approval</strong>
          </div>
        </header>

        <section className={styles.stats} aria-label="Builder profile stats">
          {builderStats.map(([label, value]) => (
            <div key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
            </div>
          ))}
        </section>

        <section className={styles.contentGrid}>
          <article className={styles.primaryPanel}>
            <div className={styles.panelHeader}>
              <div>
                <p>Current match</p>
                <h2>{builder.displayName} x {matchedCreator.name}</h2>
              </div>
              <Link href="/growth-network#match">Review match</Link>
            </div>

            <div className={styles.matchSummary}>
              <div>
                <span>Your role</span>
                <strong>{builder.role}</strong>
                <p>{builder.publicSummary}</p>
              </div>
              <div>
                <span>Matched with</span>
                <strong>{matchedCreator.name}</strong>
                <p>{matchedCreator.specialty}</p>
              </div>
              <div>
                <span>Protocol</span>
                <strong>Bloom MCP now</strong>
                <p>A2A agent card later for live agent-to-agent negotiation.</p>
              </div>
            </div>

            <table className={styles.missionTable}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Role</th>
                  <th>Score</th>
                  <th>Status</th>
                  <th>Proof</th>
                </tr>
              </thead>
              <tbody>
                {missionRows.map((row) => (
                  <tr key={row.name}>
                    <td>{row.name}</td>
                    <td>{row.role}</td>
                    <td>{row.score}</td>
                    <td>{row.status}</td>
                    <td>{row.proof}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </article>

          <aside className={styles.sidePanel}>
            <section>
              <p>Onboarding answers</p>
              <dl>
                <div>
                  <dt>Website</dt>
                  <dd>{builder.website}</dd>
                </div>
                <div>
                  <dt>Audience</dt>
                  <dd>{builder.audience.join(', ')}</dd>
                </div>
                <div>
                  <dt>Taste</dt>
                  <dd>{builder.tastePreferences.join(', ')}</dd>
                </div>
                <div>
                  <dt>Constraints</dt>
                  <dd>{builder.constraints.join(', ')}</dd>
                </div>
              </dl>
            </section>

            <section className={styles.approvalBox}>
              <p>Next agent action</p>
              <strong>{builder.nextAgentAction}</strong>
              <span>{builder.walletPolicy}</span>
            </section>
          </aside>
        </section>

        <section className={styles.creatorStrip} aria-label="Creator profile summary">
          <div>
            <p>Creator view</p>
            <h2>{creator.displayName}</h2>
            <span>{creator.role} profile matched with {creator.matchedWith}</span>
          </div>
          <div className={styles.creatorStats}>
            {creatorStats.map(([label, value]) => (
              <div key={label}>
                <span>{label}</span>
                <strong>{value}</strong>
              </div>
            ))}
          </div>
          <p>{creator.protocolLayer} {creator.walletPolicy}</p>
        </section>
      </section>
    </main>
  );
}
