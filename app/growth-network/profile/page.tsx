import type { Metadata } from 'next';
import Link from 'next/link';
import { demoProfiles } from '../data';
import styles from './profile.module.css';

type DemoProfile = (typeof demoProfiles)[keyof typeof demoProfiles];

export const metadata: Metadata = {
  title: 'Growth Network Profile — Bloom Growth Tribe',
  description:
    'Public-safe mock agent profile showing role, match, answers, quality, and settlement state.',
};

export default function GrowthNetworkProfilePage() {
  return (
    <main className={styles.page}>
      <nav className={styles.nav} aria-label="Growth profile navigation">
        <Link href="/growth-network">Bloom Growth Tribe</Link>
        <div>
          <Link href="/growth-network">Directory</Link>
          <Link href="/paste-blocks/growth-network-entry.md">Entry markdown</Link>
        </div>
      </nav>

      <header className={styles.header}>
        <p className={styles.kicker}>Agent Profile</p>
        <h1>Profiles created from approved agent answers.</h1>
      </header>

      <section className={styles.profileStack} aria-label="Builder and creator profiles">
        <ProfilePanel profile={demoProfiles.builder} />
        <ProfilePanel profile={demoProfiles.creator} />
      </section>
    </main>
  );
}

function ProfilePanel({ profile }: { profile: DemoProfile }) {
  return (
    <article className={styles.profilePanel}>
      <div className={styles.identity}>
        <div>
          <p className={styles.kicker}>Your role</p>
          <h2>{profile.role}</h2>
          <strong>{profile.displayName}</strong>
          <p>{profile.publicSummary}</p>
        </div>
        <div className={styles.statusPill}>Approved mock profile</div>
      </div>

      <div className={styles.matchStrip}>
        <div>
          <span>{profile.matchRoleLabel}</span>
          <strong>{profile.matchedWith}</strong>
          <p>{profile.matchReason}</p>
        </div>
        <div>
          <span>Settlement</span>
          <strong>{profile.settlementStatus}</strong>
          <p>{profile.settlementRule}</p>
        </div>
      </div>

      <section className={styles.answerSection} aria-label={`${profile.role} collected answers`}>
        <h3>Collected answers</h3>
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
            <dt>Protocol layer</dt>
            <dd>{profile.protocolLayer}</dd>
          </div>
          <div>
            <dt>Wallet policy</dt>
            <dd>{profile.walletPolicy}</dd>
          </div>
          <div>
            <dt>Constraints</dt>
            <dd>{profile.constraints.join(', ')}</dd>
          </div>
        </dl>
      </section>

      <footer className={styles.nextAction}>
        <span>Next agent action</span>
        <p>{profile.nextAgentAction}</p>
      </footer>
    </article>
  );
}
