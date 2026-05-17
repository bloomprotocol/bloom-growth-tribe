#!/usr/bin/env node

import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';

const transport = new StdioClientTransport({
  command: 'node',
  args: ['mcp/bloom-growth-mcp.mjs'],
});

const client = new Client({
  name: 'bloom-growth-tribe-smoke-test',
  version: '0.1.0',
});

await client.connect(transport);

const tools = await client.listTools();
const match = await client.callTool({
  name: 'create_match_packet',
  arguments: {
    projectName: 'Signal Garden',
    creatorName: 'DevRel Fieldnotes',
  },
});

console.log(JSON.stringify({
  tools: tools.tools.map((tool) => tool.name),
  matchPacketPreview: match.content[0].text.slice(0, 220),
}, null, 2));

await client.close();
