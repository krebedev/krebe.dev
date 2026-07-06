import draft from './draft.md?raw';

export type StoryBlock =
  | { type: 'h2'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'stanza'; lines: string[] };

export type StorySegment =
  | { type: 'text'; value: string }
  | { type: 'link'; label: string; href: string };

function parseDraft(markdown: string): StoryBlock[] {
  return markdown
    .trim()
    .split(/\n\n+/)
    .map((block) => {
      const lines = block
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean);

      if (!lines.length) return null;

      if (lines[0].startsWith('## ')) {
        return { type: 'h2' as const, text: lines[0].slice(3) };
      }

      if (lines[0].startsWith('### ')) {
        return { type: 'h3' as const, text: lines[0].slice(4) };
      }

      return { type: 'stanza' as const, lines };
    })
    .filter((block): block is StoryBlock => block !== null);
}

export function isStoryQuote(line: string): boolean {
  return line.startsWith('"') && line.endsWith('"');
}

export function parseStoryLine(line: string): StorySegment[] {
  const segments: StorySegment[] = [];
  const linkPattern = /\[([^\]]+)\]\(([^)]+)\)/g;
  let lastIndex = 0;

  for (const match of line.matchAll(linkPattern)) {
    if (match.index === undefined) continue;

    if (match.index > lastIndex) {
      segments.push({ type: 'text', value: line.slice(lastIndex, match.index) });
    }

    segments.push({ type: 'link', label: match[1], href: match[2] });
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < line.length) {
    segments.push({ type: 'text', value: line.slice(lastIndex) });
  }

  return segments.length ? segments : [{ type: 'text', value: line }];
}

export const storyBlocks = parseDraft(draft);
