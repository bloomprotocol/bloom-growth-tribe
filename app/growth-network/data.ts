export type ProjectBrief = {
  name: string;
  website: string;
  tagline: string;
  description: string;
  category: string;
  launchNeed: string;
  targetAudience: string;
  stage: string;
  preferredStyle: string[];
  budgetRange: string;
  proofRequired: string;
  channelsWanted: string[];
};

export type CreatorCard = {
  name: string;
  specialty: string;
  platform: string;
  socialLinks: { label: string; url: string }[];
  audience: string;
  audienceStats: string;
  cadence: string;
  acceptedFormats: string[];
  proofAvailable: string;
  startingRange: string;
  tastePreferences: string[];
  sampleWork: string;
  qualityScore: number;
  qualitySignals: string[];
};

export const creatorQualityRubric = [
  {
    label: 'Proof completeness',
    description: 'Can the creator provide URLs, screenshots, timestamps, post IDs, or archive links?',
  },
  {
    label: 'Audience trust',
    description: 'Does the channel have niche credibility with the builder’s actual audience?',
  },
  {
    label: 'Content quality',
    description: 'Does the creator’s sample work match the tone, taste, and claim discipline needed?',
  },
  {
    label: 'Constraint fit',
    description: 'Will they respect forbidden claims, blocked categories, community rules, and proof rules?',
  },
  {
    label: 'Reliability signal',
    description: 'Can they confirm format, timeline, proof delivery, and approval flow before launch?',
  },
];

export const projectDirectory: ProjectBrief[] = [
  {
    name: 'Quiet Launch OS',
    website: 'https://example.com/quiet-launch-os',
    tagline: 'A weekly launch command center for indie makers.',
    description: 'Helps solo builders plan, ship, and review one focused launch loop every week.',
    category: 'Founder tools',
    launchNeed: 'Launch a tiny command center for indie makers shipping one product per week.',
    targetAudience: 'Solo founders, weekend builders, product engineers',
    stage: 'Private beta',
    preferredStyle: ['calm technical', 'maker diary', 'useful templates'],
    budgetRange: '$350-$700',
    proofRequired: 'Live post URL, timestamp, engagement screenshot after 48 hours',
    channelsWanted: ['X', 'newsletter', 'builder community'],
  },
  {
    name: 'Signal Garden',
    website: 'https://example.com/signal-garden',
    tagline: 'Make your launch docs easier for agents to parse.',
    description: 'Turns messy product notes into public-safe briefs that AI agents can understand and reuse.',
    category: 'AI visibility',
    launchNeed: 'Explain how small teams can make their docs easier for agents to parse.',
    targetAudience: 'B2B SaaS founders, DevRel leads, AI tooling teams',
    stage: 'Public demo',
    preferredStyle: ['educational', 'high-quality writing', 'operator credibility'],
    budgetRange: '$500-$900',
    proofRequired: 'Newsletter archive link and click screenshot',
    channelsWanted: ['technical newsletter', 'blog', 'DevRel community'],
  },
  {
    name: 'Draft Harbor',
    website: 'https://example.com/draft-harbor',
    tagline: 'Repurpose long notes into useful launch assets.',
    description: 'A creator workflow tool for turning research notes into posts, blurbs, and product updates.',
    category: 'Creator workflow',
    launchNeed: 'Find channels that can show a practical workflow for repurposing long notes.',
    targetAudience: 'Newsletter writers, consultants, knowledge workers',
    stage: 'Early access',
    preferredStyle: ['product-led', 'founder-story', 'workflow screenshots'],
    budgetRange: '$250-$600',
    proofRequired: 'Post ID plus analytics screenshot',
    channelsWanted: ['X thread', 'short video', 'newsletter blurb'],
  },
  {
    name: 'Kindred Beta',
    website: 'https://example.com/kindred-beta',
    tagline: 'Soft-launch community software for small rooms.',
    description: 'A lightweight member-intro and discussion system for curated communities.',
    category: 'Community software',
    launchNeed: 'Recruit 40 thoughtful beta users from niche communities without loud hype.',
    targetAudience: 'Community builders, curators, small membership hosts',
    stage: 'Beta waitlist',
    preferredStyle: ['community trust', 'soft launch', 'editorial'],
    budgetRange: '$300-$800',
    proofRequired: 'Community post URL or approved screenshot',
    channelsWanted: ['private community', 'newsletter', 'curator blog'],
  },
];

export const creatorDirectory: CreatorCard[] = [
  {
    name: 'Mira Notes',
    specialty: 'Calm founder tools and thoughtful launch essays',
    platform: 'Newsletter',
    socialLinks: [
      { label: 'Newsletter', url: 'https://example.com/mira-notes' },
      { label: 'X', url: 'https://x.com/example-mira' },
      { label: 'LinkedIn', url: 'https://linkedin.com/in/example-mira' },
    ],
    audience: '18K builders who like gentle operating systems and useful launch notes',
    audienceStats: '18K subscribers, 46% open rate, 6.2% click-through rate',
    cadence: 'Weekly',
    acceptedFormats: ['newsletter blurb', 'workflow teardown', 'bundle mention'],
    proofAvailable: 'Archive URL, click screenshot, send timestamp',
    startingRange: '$650',
    tastePreferences: ['calm tools', 'honest founder stories', 'high-quality writing'],
    sampleWork: 'https://example.com/mira-notes/sample',
    qualityScore: 88,
    qualitySignals: ['Strong archive proof', 'High writing quality', 'Calm founder-tool taste'],
  },
  {
    name: 'Tiny Demos Club',
    specialty: 'Visual product demos for indie launches',
    platform: 'X + short video',
    socialLinks: [
      { label: 'X', url: 'https://x.com/example-demos' },
      { label: 'TikTok', url: 'https://tiktok.com/@example-demos' },
      { label: 'YouTube', url: 'https://youtube.com/@example-demos' },
    ],
    audience: '24K indie hackers, demo lovers, and prototype collectors',
    audienceStats: '24K followers, 8K median short-video views',
    cadence: '3 demos per week',
    acceptedFormats: ['single post', 'thread', 'short video'],
    proofAvailable: 'Post URL, video link, 48-hour analytics screenshot',
    startingRange: '$450',
    tastePreferences: ['product-led', 'visual workflows', 'launch-day energy'],
    sampleWork: 'https://example.com/tiny-demos/sample',
    qualityScore: 83,
    qualitySignals: ['Fast demo format', 'Strong reach for small launches', 'Needs claim guardrails'],
  },
  {
    name: 'DevRel Fieldnotes',
    specialty: 'Technical founder education and DevRel proof',
    platform: 'Blog + community',
    socialLinks: [
      { label: 'Blog', url: 'https://example.com/devrel-fieldnotes' },
      { label: 'Community', url: 'https://example.com/devrel-community' },
      { label: 'LinkedIn', url: 'https://linkedin.com/company/example-devrel' },
    ],
    audience: '9K technical founders and DevRel operators',
    audienceStats: '9K readers, 1.8K average readers per technical note',
    cadence: 'Biweekly fieldnote',
    acceptedFormats: ['technical note', 'community post', 'bundle'],
    proofAvailable: 'Permalink, community screenshot, timestamp',
    startingRange: '$500',
    tastePreferences: ['technical clarity', 'proof-first claims', 'developer utility'],
    sampleWork: 'https://example.com/devrel-fieldnotes/sample',
    qualityScore: 94,
    qualitySignals: ['Best proof discipline', 'Strong audience trust', 'Technical tone match'],
  },
  {
    name: 'The Small Room',
    specialty: 'Community-trust launches for curated audiences',
    platform: 'Private community',
    socialLinks: [
      { label: 'Community', url: 'https://example.com/the-small-room' },
      { label: 'Newsletter', url: 'https://example.com/small-room-letter' },
      { label: 'X', url: 'https://x.com/example-small-room' },
    ],
    audience: '3K curators, paid community hosts, and thoughtful solo operators',
    audienceStats: '3K members, high-trust moderated posting',
    cadence: 'Weekly community digest',
    acceptedFormats: ['community post', 'AMA prompt', 'soft intro'],
    proofAvailable: 'Approved screenshot, moderator timestamp, reply summary',
    startingRange: '$300',
    tastePreferences: ['community trust', 'quiet launches', 'tasteful constraints'],
    sampleWork: 'https://example.com/the-small-room/sample',
    qualityScore: 86,
    qualitySignals: ['Niche community fit', 'Soft launch style', 'Moderator approval required'],
  },
];

export const demoProfiles = {
  builder: {
    role: 'Builder',
    displayName: 'Signal Garden',
    publicSummary: 'AI visibility tool helping small teams turn launch docs into agent-readable briefs.',
    website: 'https://example.com/signal-garden',
    category: 'AI visibility',
    launchGoal: 'Explain how small teams can make docs easier for agents to parse.',
    audience: ['B2B SaaS founders', 'DevRel leads', 'AI tooling teams'],
    tastePreferences: ['educational', 'operator credibility', 'high-quality writing'],
    constraints: ['No guaranteed revenue claims', 'No ranking guarantees', 'Public-safe examples only'],
    budgetOrPrice: '$500-$900 launch budget',
    proofRules: ['Public URL', 'Timestamp', 'Analytics screenshot if available'],
    matchedWith: 'DevRel Fieldnotes',
    matchRoleLabel: 'Matched creator/channel',
    matchReason: 'Technical trust, proof discipline, and educational style fit Signal Garden’s launch need.',
    nextAgentAction: 'Approve match request JSON before sending or spending anything.',
  },
  creator: {
    role: 'Creator/channel',
    displayName: 'DevRel Fieldnotes',
    publicSummary: 'Technical blog and community channel for founders and DevRel operators.',
    website: 'https://example.com/devrel-fieldnotes',
    category: 'Blog + community',
    launchGoal: 'Review technical founder tools and practical agent-readable workflows.',
    audience: ['Technical founders', 'DevRel operators', 'Developer-tool builders'],
    tastePreferences: ['technical clarity', 'proof-first claims', 'developer utility'],
    constraints: ['No financial promises', 'No health claims', 'No low-context AI wrappers'],
    budgetOrPrice: '$500-$900 starting range',
    proofRules: ['Permalink', 'Community screenshot', 'Timestamp'],
    matchedWith: 'Signal Garden',
    matchRoleLabel: 'Matched builder/project',
    matchReason: 'AI visibility category, proof-first claims, and DevRel audience fit the channel.',
    nextAgentAction: 'Approve capability card before listing or accepting any deal.',
  },
};
