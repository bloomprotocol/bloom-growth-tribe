import type { Metadata } from 'next';
import Link from 'next/link';
import { demoProfiles } from '../data';
import styles from './profile.module.css';

type DemoProfile = (typeof demoProfiles)[keyof typeof demoProfiles];

export const metadata: Metadata = {
  title: 'Growth Network Profile — Bloom Growth Tribe',
  description:
    'Public-safe mock profile showing the builder and creator answers an agent collects for Bloom Growth Tribe matching.',
};

export default function GrowthNetworkProfilePage() {
  return (
    <main className={styles.page}>
      <nav className={styles.nav} aria-label="Growth profile navigation">
        <Link href="/growth-network">Bloom Growth Tribe</Link>
        <div>
          <Link href="/growth-network">Demo</Link>
          <Link href="/paste-blocks/growth-network-entry.md">Entry markdown</Link>
        </div>
      </nav>

      <header className={styles.header}>
        <p className={styles.kicker}>Profile Preview</p>
        <h1>Your role, your answers, and your current match.</h1>
        <p>
          In the MVP this page uses public-safe mock data. A production version would save approved
          builder and creator answers through a small backend before listing or matching.
        </p>
      </header>

      <section className={styles.profileGrid} aria-label="Builder and creator profile cards">
        <ProfileCard profile={demoProfiles.builder} />
        <ProfileCard profile={demoProfiles.creator} />
      </section>

      <section className={styles.backendNote} aria-labelledby="backend-title">
        <div>
          <p className={styles.kicker}>FE / BE Need</p>
          <h2 id="backend-title">No backend is required for this demo loop.</h2>
        </div>
        <p>
          The hackathon demo can show agent-collected answers from mock JSON. A real launch would add
          an API for approved profile submissions, a database table for builder briefs and creator
          capability cards, and server-side moderation before public listing.
        </p>
      </section>
    </main>
  );
}

function ProfileCard({ profile }: { profile: DemoProfile }) {
  return (
    <article className={styles.profileCard}>
      <p className={styles.kicker}>Your role: {profile.role}</p>
      <h2>{profile.displayName}</h2>
      <p className={styles.summary}>{profile.publicSummary}</p>
      <div className={styles.matchBox}>
        <span>{profile.matchRoleLabel}</span>
        <strong>{profile.matchedWith}</strong>
        <p>{profile.matchReason}</p>
      </div>
      <dl>
        <div>
          <dt>Website</dt>
          <dd>{profile.website}</dd>
        </div>
        <div>
          <dt>Category</dt>
          <dd>{profile.category}</dd>
        </div>
        <div>
          <dt>Goal</dt>
          <dd>{profile.launchGoal}</dd>
        </div>
        <div>
          <dt>Audience</dt>
          <dd>{profile.audience.join(', ')}</dd>
        </div>
        <div>
          <dt>Taste</dt>
          <dd>{profile.tastePreferences.join(', ')}</dd>
        </div>
        <div>
          <dt>Budget / price</dt>
          <dd>{profile.budgetOrPrice}</dd>
        </div>
        <div>
          <dt>Proof rules</dt>
          <dd>{profile.proofRules.join(', ')}</dd>
        </div>
        <div>
          <dt>Constraints</dt>
          <dd>{profile.constraints.join(', ')}</dd>
        </div>
      </dl>
      <div className={styles.nextAction}>
        <span>Next agent action</span>
        <p>{profile.nextAgentAction}</p>
      </div>
    </article>
  );
}
