/**
 * Migration script to import existing blog posts from posts.ts to Sanity
 * 
 * Run with: npx sanity exec scripts/migrate-posts.ts --with-user-token
 */

import {getCliClient} from 'sanity/cli'

const client = getCliClient()

// Existing posts from src/content/blog/posts.ts
const posts = [
  {
    slug: 'hello-world',
    title: 'Hello, World!',
    description: "Welcome to my corner of the internet. Here's what I'm building and why.",
    date: '2026-01-07',
    tags: ['personal', 'meta'],
    readingTime: '3 min read',
    draft: false,
    content: `# Hello, World!

Welcome to **mihai.codes** - my personal corner of the internet.

## Why This Site?

I've always believed that the best way to learn is to build in public. This site is my experiment in:

1. **Qwik** - A resumable framework that ships near-zero JavaScript
2. **Tailwind CSS** - Utility-first styling with dark/light theme support
3. **Cloudflare Pages** - Edge deployment for global performance

## What to Expect

I'll be writing about:

- **Software Engineering** - Deep dives into architecture, patterns, and lessons learned
- **Product Thinking** - My journey from engineer to aspiring PM
- **Building in Public** - Progress updates on this site and other projects

## The Tech Stack

This site is intentionally over-engineered for learning purposes:

\`\`\`
Frontend:  Qwik + Tailwind CSS
Testing:   Vitest + Codecov
Hosting:   Cloudflare Pages
CI/CD:     GitHub Actions
\`\`\`

## Let's Connect

Find me on [GitHub](https://github.com/chindris-mihai-alexandru) or [LinkedIn](https://linkedin.com/in/mihai-chindris).

Thanks for reading!

— Mihai`,
  },
  {
    slug: 'why-qwik',
    title: 'Why I Chose Qwik Over Next.js',
    description: "A deep dive into resumability, hydration, and why Qwik's approach to JavaScript is revolutionary.",
    date: '2026-01-06',
    tags: ['qwik', 'javascript', 'frameworks'],
    readingTime: '5 min read',
    draft: false,
    content: `# Why I Chose Qwik Over Next.js

When I started building this site, the obvious choice was Next.js. It's battle-tested, has great DX, and the ecosystem is huge.

So why did I choose Qwik instead?

## The Problem with Hydration

Traditional frameworks like React, Vue, and even Next.js all share the same fundamental problem: **hydration**.

Here's what happens:

1. Server renders HTML
2. Client downloads JavaScript bundle
3. Client re-executes the same code to "hydrate" the page
4. Page becomes interactive

This means you're essentially running your app **twice**. Once on the server, once on the client.

## Qwik's Resumability

Qwik takes a radically different approach. Instead of hydration, it uses **resumability**:

1. Server renders HTML with embedded serialized state
2. Client downloads only the JavaScript needed for the current interaction
3. No re-execution - it "resumes" where the server left off

\`\`\`typescript
// This component ships ZERO JavaScript until you click
export const Counter = component$(() => {
  const count = useSignal(0);
  
  return (
    <button onClick$={() => count.value++}>
      Count: {count.value}
    </button>
  );
});
\`\`\`

## The Results

On this site, the initial JavaScript payload is **under 1KB**. Compare that to a typical Next.js app which ships 70-100KB+ just for React itself.

## Trade-offs

Qwik isn't perfect:

- Smaller ecosystem than React
- Learning curve for the \`$\` syntax
- Some edge cases with third-party libraries

But for a personal site where performance matters? It's perfect.

## Conclusion

If you're building content-heavy sites, blogs, or marketing pages - give Qwik a try. The performance wins are real.

— Mihai`,
  },
  {
    slug: 'aws-bedrock-anthropic-troubleshooting',
    title: 'AWS Bedrock + Anthropic Claude: The Complete Troubleshooting Guide',
    description: 'Three undocumented gotchas that will save you hours of debugging when setting up Claude models on AWS Bedrock.',
    date: '2026-01-09',
    tags: ['aws', 'bedrock', 'anthropic', 'cloud'],
    readingTime: '8 min read',
    draft: true,
    content: `# AWS Bedrock + Anthropic Claude: The Complete Troubleshooting Guide (2026)

> Three undocumented gotchas that will save you hours of debugging

---

## TL;DR

Getting cryptic errors trying to use Anthropic Claude models on AWS Bedrock? Here are the three issues I encountered and their fixes:

| Problem | Error Message | Solution |
|---------|---------------|----------|
| Form validation | "Model use case details have not been submitted" | Use \`www.\` prefix in website URL |
| Wrong model ID | "on-demand throughput isn't supported" | Use \`us.anthropic.claude-*\` (with regional prefix) |
| Can't find settings | N/A | Go to Model Catalog, not Model Access |

---

## Introduction

I recently spent several hours debugging what seemed like a simple task: getting Claude models to work on AWS Bedrock. 

The error messages were cryptic. The documentation was scattered. And some crucial details weren't documented at all.

This guide documents everything I learned so you don't have to go through the same frustration.

**What you'll learn:**
- How to correctly submit the Anthropic use case form
- The difference between model IDs and inference profile IDs
- Where to find model settings after AWS retired the Model Access page
- Working commands to test all Claude models

---

*[Content truncated for migration - full content preserved in original]*`,
  },
  {
    slug: 'building-ai-agents-with-opencode',
    title: 'Building AI Agents with OpenCode and Free LLMs',
    description: 'How to set up an autonomous AI coding agent using OpenCode, OpenRouter, and completely free language models.',
    date: '2026-01-09',
    tags: ['ai', 'opencode', 'agents', 'cloud'],
    readingTime: '10 min read',
    draft: true,
    content: `# Building AI Agents with OpenCode and Free LLMs

> How to set up an autonomous AI coding agent for $0/month

---

## TL;DR

You can run a powerful AI coding agent completely free using:
- **OpenCode** - Open-source AI coding CLI
- **OpenRouter** - Free tier with top coding models
- **MiMo v2 Flash** - Best free coding model (SWE-bench #1)

---

## Introduction

*This post is a work in progress. Check back soon for the complete guide!*

---

## What We're Building

An AI agent that can:
- Read and understand your codebase
- Make changes across multiple files
- Run tests and fix failures
- Respond to GitHub issues automatically

---

## The Stack

| Component | Tool | Cost |
|-----------|------|------|
| AI Agent | OpenCode | Free (open source) |
| LLM Provider | OpenRouter | Free tier |
| Model | MiMo v2 Flash | Free |
| Automation | Cyrus + Linear | Free |

---

## Coming Soon

- Step-by-step setup guide
- OpenCode configuration
- Free model comparison
- Linear integration for automated issue handling

---

*Stay tuned! Follow me on [LinkedIn](https://linkedin.com/in/mihai-chindris) for updates.*`,
  },
]

async function migratePosts() {
  console.log('Starting migration of blog posts to Sanity...')
  console.log(`Found ${posts.length} posts to migrate\n`)

  const transaction = client.transaction()

  for (const post of posts) {
    const doc = {
      _id: `post-${post.slug}`, // Deterministic ID based on slug
      _type: 'post',
      title: post.title,
      slug: {
        _type: 'slug',
        current: post.slug,
      },
      description: post.description,
      date: post.date,
      tags: post.tags,
      readingTime: post.readingTime,
      draft: post.draft,
      content: post.content,
    }

    console.log(`  → ${post.draft ? '[DRAFT] ' : ''}${post.title}`)
    transaction.createOrReplace(doc)
  }

  try {
    await transaction.commit()
    console.log('\n✅ Migration complete! All posts imported successfully.')
    console.log('\nRefresh Sanity Studio to see your posts.')
  } catch (err) {
    console.error('\n❌ Migration failed:', err)
    process.exit(1)
  }
}

migratePosts()
