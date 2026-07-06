import { site } from './site';

export function buildLlmsTxt(): string {
  const homepage = new URL('/', site.url).href;
  const llmsFull = new URL('/llms-full.txt', site.url).href;
  const email = `mailto:${site.email}`;

  return `# ${site.title}

> Personal site of ${site.name}, a ${site.jobTitle.toLowerCase()}. ${site.heroStatement}

${site.description}

## Pages

- [Homepage](${homepage}): Hero, professional story, and contact block.
- [Full site content](${llmsFull}): Complete homepage copy in Markdown for AI agents.

## Optional

- [GitHub](${site.social.github}): Open-source work and projects.
- [LinkedIn](${site.social.linkedIn}): Professional profile.
- [${site.employer.name}](${site.employer.url}): Current employer product site.
- [Email](${email}): Contact email.
`;
}
