import type { Metadata } from 'next';
import GrowthNetworkDemo from './GrowthNetworkDemo';
import { creatorDirectory, projectDirectory } from './data';

export const metadata: Metadata = {
  title: 'Bloom Growth Tribe — Agent-Native Growth Network',
  description:
    'A public demo where builders and creator channels join through markdown prompts, get listed in a directory, and are matched by agents.',
  alternates: {
    canonical: '/growth-network',
  },
};

const projectJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Bloom Growth Tribe project briefs',
  itemListElement: projectDirectory.map((project, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    item: {
      '@type': 'CreativeWork',
      name: project.name,
      description: `${project.category}. ${project.launchNeed}`,
      audience: project.targetAudience,
      keywords: project.preferredStyle.join(', '),
    },
  })),
};

const creatorJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Bloom Growth Tribe creator capability cards',
  itemListElement: creatorDirectory.map((creator, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    item: {
      '@type': 'Person',
      name: creator.name,
      description: `${creator.platform} channel for ${creator.audience}`,
      url: creator.sampleWork,
      knowsAbout: creator.tastePreferences.join(', '),
    },
  })),
};

export default function GrowthNetworkPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(creatorJsonLd) }}
      />
      <GrowthNetworkDemo />
    </>
  );
}
