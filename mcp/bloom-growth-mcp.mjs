#!/usr/bin/env node

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';

const projects = [
  {
    name: 'Quiet Launch OS',
    website: 'https://example.com/quiet-launch-os',
    category: 'Founder tools',
    stage: 'Private beta',
    description: 'A weekly launch command center for indie makers.',
    launchNeed: 'Launch a tiny command center for indie makers shipping one product per week.',
    targetAudience: 'Solo founders, weekend builders, product engineers',
    budgetRange: '$350-$700',
    proofRequired: 'Live post URL, timestamp, engagement screenshot after 48 hours',
    preferredStyle: ['calm technical', 'maker diary', 'useful templates'],
    channelsWanted: ['X', 'newsletter', 'builder community'],
  },
  {
    name: 'Signal Garden',
    website: 'https://example.com/signal-garden',
    category: 'AI visibility',
    stage: 'Public demo',
    description: 'Make launch docs easier for agents to parse.',
    launchNeed: 'Explain how small teams can make docs easier for agents to parse.',
    targetAudience: 'B2B SaaS founders, DevRel leads, AI tooling teams',
    budgetRange: '$500-$900',
    proofRequired: 'Newsletter archive link and click screenshot',
    preferredStyle: ['educational', 'high-quality writing', 'operator credibility'],
    channelsWanted: ['technical newsletter', 'blog', 'DevRel community'],
  },
  {
    name: 'Draft Harbor',
    website: 'https://example.com/draft-harbor',
    category: 'Creator workflow',
    stage: 'Early access',
    description: 'Repurpose long notes into useful launch assets.',
    launchNeed: 'Show a practical workflow for turning research notes into posts.',
    targetAudience: 'Newsletter writers, consultants, knowledge workers',
    budgetRange: '$250-$600',
    proofRequired: 'Post ID plus analytics screenshot',
    preferredStyle: ['product-led', 'founder-story', 'workflow screenshots'],
    channelsWanted: ['X thread', 'short video', 'newsletter blurb'],
  },
  {
    name: 'Kindred Beta',
    website: 'https://example.com/kindred-beta',
    category: 'Community software',
    stage: 'Beta waitlist',
    description: 'Soft-launch community software for small rooms.',
    launchNeed: 'Recruit 40 thoughtful beta users from niche communities.',
    targetAudience: 'Community builders, curators, small membership hosts',
    budgetRange: '$300-$800',
    proofRequired: 'Community post URL or approved screenshot',
    preferredStyle: ['community trust', 'soft launch', 'editorial'],
    channelsWanted: ['private community', 'newsletter', 'curator blog'],
  },
];

const creators = [
  {
    name: 'Mira Notes',
    platform: 'Newsletter',
    specialty: 'Calm founder tools and thoughtful launch essays',
    audience: '18K builders who like gentle operating systems and useful launch notes',
    audienceStats: '18K subscribers, 46% open rate, 6.2% click-through rate',
    acceptedFormats: ['newsletter blurb', 'workflow teardown', 'bundle mention'],
    proofAvailable: 'Archive URL, click screenshot, send timestamp',
    startingRange: '$650',
    tastePreferences: ['calm tools', 'honest founder stories', 'high-quality writing'],
    qualityScore: 88,
    qualitySignals: ['Strong archive proof', 'High writing quality', 'Calm founder-tool taste'],
  },
  {
    name: 'Tiny Demos Club',
    platform: 'X + short video',
    specialty: 'Visual product demos for indie launches',
    audience: '24K indie hackers, demo lovers, and prototype collectors',
    audienceStats: '24K followers, 8K median short-video views',
    acceptedFormats: ['single post', 'thread', 'short video'],
    proofAvailable: 'Post URL, video link, 48-hour analytics screenshot',
    startingRange: '$450',
    tastePreferences: ['product-led', 'visual workflows', 'launch-day energy'],
    qualityScore: 83,
    qualitySignals: ['Fast demo format', 'Strong reach for small launches', 'Needs claim guardrails'],
  },
  {
    name: 'DevRel Fieldnotes',
    platform: 'Blog + community',
    specialty: 'Technical founder education and DevRel proof',
    audience: '9K technical founders and DevRel operators',
    audienceStats: '9K readers, 1.8K average readers per technical note',
    acceptedFormats: ['technical note', 'community post', 'bundle'],
    proofAvailable: 'Permalink, community screenshot, timestamp',
    startingRange: '$500',
    tastePreferences: ['developer utility', 'restrained claims', 'operator credibility'],
    qualityScore: 91,
    qualitySignals: ['Credential check passed', 'High audience trust', 'Strong proof discipline'],
  },
  {
    name: 'Community Signal',
    platform: 'Private community + newsletter',
    specialty: 'Curated community software and trust-first launches',
    audience: '6K community hosts, curators, and membership operators',
    audienceStats: '6K members, 1.1K median community post views',
    acceptedFormats: ['community post', 'newsletter blurb', 'founder Q&A'],
    proofAvailable: 'Approved screenshot, moderator timestamp, newsletter archive',
    startingRange: '$350',
    tastePreferences: ['community trust', 'soft launch', 'low-hype products'],
    qualityScore: 86,
    qualitySignals: ['Niche trust', 'Clear proof rules', 'Strong constraint fit'],
  },
];

const matchResult = {
  project: 'Signal Garden',
  creator: 'DevRel Fieldnotes',
  fitScore: 92,
  audienceFit: 'Technical founders and DevRel operators already care about agent-readable docs.',
  styleFit: 'Educational, proof-first writing matches the project trust requirement.',
  tasteFit: 'The channel prefers developer utility and restrained claims.',
  budgetFit: '$500 starting range fits inside the $500-$900 launch budget.',
  proofFit: 'Permalink, community screenshot, and timestamp satisfy the proof checklist.',
  hiddenGemSignal: 'Smaller reach, higher credibility: strong mid-tail fit for a technical category.',
  risks: ['Avoid broad AI productivity claims.', 'Keep examples grounded in docs and agent parsing.', 'Confirm community post rules before publishing.'],
  collaborationPackage: 'One technical note plus one community post, with a 48-hour reply summary.',
  missionDraft:
    'Draft a practical fieldnote showing how a small team turns messy launch docs into an agent-readable growth brief, then invite readers to compare their own docs against the checklist.',
  proofChecklist: ['Public permalink', 'Timestamped screenshot', 'Copy approved by builder', 'Claim check completed', 'Reply summary after 48 hours'],
  nextMessages: {
    builderAgent: 'Approve the match request JSON, confirm forbidden claims, and send one product screenshot plus one best-user quote.',
    creatorAgent: 'Approve the capability card, confirm format and price, and share one sample technical note with proof.',
  },
};

function asText(data) {
  return {
    content: [
      {
        type: 'text',
        text: JSON.stringify(data, null, 2),
      },
    ],
  };
}

function findProject(name) {
  return projects.find((project) => project.name.toLowerCase() === name.toLowerCase()) ?? projects[1];
}

function findCreator(name) {
  return creators.find((creator) => creator.name.toLowerCase() === name.toLowerCase()) ?? creators[2];
}

const server = new McpServer({
  name: 'bloom-growth-tribe',
  version: '0.1.0',
});

server.registerTool(
  'list_projects',
  {
    title: 'List public builder projects',
    description: 'Return public-safe project cards for agent matching.',
    inputSchema: {
      category: z.string().optional().describe('Optional category filter.'),
    },
  },
  async ({ category }) => {
    const filtered = category
      ? projects.filter((project) => project.category.toLowerCase().includes(category.toLowerCase()))
      : projects;
    return asText({ projects: filtered });
  },
);

server.registerTool(
  'list_creators',
  {
    title: 'List creator capability cards',
    description: 'Return creator/channel cards with quality, proof, taste, and format signals.',
    inputSchema: {
      platform: z.string().optional().describe('Optional platform filter.'),
    },
  },
  async ({ platform }) => {
    const filtered = platform
      ? creators.filter((creator) => creator.platform.toLowerCase().includes(platform.toLowerCase()))
      : creators;
    return asText({ creators: filtered });
  },
);

server.registerTool(
  'score_match',
  {
    title: 'Score one project against one creator',
    description: 'Compare a builder brief and creator card across audience, taste, proof, quality, budget, and constraints.',
    inputSchema: {
      projectName: z.string().default('Signal Garden'),
      creatorName: z.string().default('DevRel Fieldnotes'),
    },
  },
  async ({ projectName, creatorName }) => {
    const project = findProject(projectName);
    const creator = findCreator(creatorName);
    return asText({
      project: project.name,
      creator: creator.name,
      fitScore: project.name === 'Signal Garden' && creator.name === 'DevRel Fieldnotes' ? 92 : 84,
      scores: {
        audienceFit: project.targetAudience,
        creatorAudience: creator.audience,
        tasteFit: creator.tastePreferences,
        proofFit: creator.proofAvailable,
        qualityScore: creator.qualityScore,
        budgetFit: `${creator.startingRange} vs ${project.budgetRange}`,
      },
      note: 'Bloom scores fit before drafting a mission. Reach is not the only signal.',
    });
  },
);

server.registerTool(
  'create_match_packet',
  {
    title: 'Create match packet',
    description: 'Draft the recommended creator match, mission, proof checklist, risks, and next agent messages.',
    inputSchema: {
      projectName: z.string().default('Signal Garden'),
      creatorName: z.string().default('DevRel Fieldnotes'),
    },
  },
  async ({ projectName, creatorName }) => {
    const project = findProject(projectName);
    const creator = findCreator(creatorName);
    return asText({
      ...matchResult,
      project: project.name,
      creator: creator.name,
    });
  },
);

server.registerTool(
  'prepare_settlement_packet',
  {
    title: 'Prepare human-approved payment packet',
    description: 'Prepare a public-safe settlement packet. This never registers wallets, sends funds, or releases payment.',
    inputSchema: {
      creatorName: z.string().default('DevRel Fieldnotes'),
      rail: z.enum(['manual_invoice', 'privy_policy_wallet', 'x402', 'mpp']).default('manual_invoice'),
      amount: z.string().default('0.01 USDC proof payment'),
    },
  },
  async ({ creatorName, rail, amount }) => {
    const creator = findCreator(creatorName);
    return asText({
      creator: creator.name,
      rail,
      amount,
      status: 'prepared_only',
      controls: [
        'Human approval required',
        'Approved recipient only',
        'Capped amount',
        'Proof checklist attached',
        'No autonomous fund release',
      ],
    });
  },
);

const transport = new StdioServerTransport();
await server.connect(transport);
