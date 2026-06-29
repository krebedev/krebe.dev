import draft from './draft.md?raw';

export type StoryBlock =
  | { type: 'h2'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'stanza'; lines: string[] };

export function parseDraft(markdown: string): StoryBlock[] {
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

export const storyBlocks = parseDraft(draft);
