import type { APIRoute } from 'astro';
import { buildLlmsTxt } from '../data/llms';

export const prerender = true;

export const GET: APIRoute = () =>
  new Response(buildLlmsTxt(), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
