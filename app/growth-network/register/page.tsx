import type { Metadata } from 'next';
import Link from 'next/link';
import styles from './register.module.css';

export const metadata: Metadata = {
  title: 'Register — Bloom Growth Tribe',
  description:
    'Mock login and registration flow for Bloom Growth Tribe agent onboarding.',
};

const steps = [
  'Choose builder, creator/channel, or both',
  'Paste the entry markdown into Codex or your agent',
  'Approve the generated profile card',
  'Open the agent dashboard',
];

const fields = [
  'Project or channel name',
  'Website or handle',
  'Audience',
  'Budget or starting price',
  'Proof rules',
  'Settlement preference',
];

export default function GrowthNetworkRegisterPage() {
  return (
    <main className={styles.page}>
      <nav className={styles.nav} aria-label="Growth network register navigation">
        <Link href="/growth-network">Bloom Growth Tribe</Link>
        <div>
          <Link href="/growth-network/profile">Dashboard</Link>
          <Link href="/paste-blocks/growth-network-entry.md">Entry markdown</Link>
        </div>
      </nav>

      <section className={styles.shell}>
        <div className={styles.copy}>
          <p className={styles.kicker}>Register / Login</p>
          <h1>Create the profile your agent will keep updated.</h1>
          <p>
            This hackathon build uses a mock auth screen. In production, login would save approved
            agent answers and generate the dashboard automatically.
          </p>
          <ol>
            {steps.map((step) => <li key={step}>{step}</li>)}
          </ol>
        </div>

        <section className={styles.formPanel} aria-label="Mock registration form">
          <div className={styles.segmented} role="group" aria-label="Registration role">
            <button type="button">Builder</button>
            <button type="button">Creator</button>
            <button type="button">Both</button>
          </div>

          <div className={styles.mockFields}>
            {fields.map((field, index) => (
              <label key={field}>
                <span>{field}</span>
                <input readOnly value={index === 0 ? 'Signal Garden' : ''} placeholder="Agent will fill from approved answers" />
              </label>
            ))}
          </div>

          <div className={styles.agentBox}>
            <span>Agent onboarding</span>
            <p>
              Paste the entry markdown into Codex. The agent asks the role question, collects the right
              fields, then returns a profile JSON for this dashboard.
            </p>
          </div>

          <div className={styles.actions}>
            <Link href="/paste-blocks/growth-network-entry.md">Open entry markdown</Link>
            <Link href="/growth-network/profile">View generated dashboard</Link>
          </div>
        </section>
      </section>
    </main>
  );
}
