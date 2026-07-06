import type { APIRoute } from "astro";
import draft from "../data/draft.md?raw";
import { site } from "../data/site";

export const prerender = true;

export const GET: APIRoute = () => {
  const body = `# ${site.name}

> ${site.jobTitle}. ${site.heroStatement}

${draft.trim()}

## Contact

- Email: ${site.email}
- GitHub: ${site.social.github}
- LinkedIn: ${site.social.linkedIn}
- Employer: [${site.employer.name}](${site.employer.url})
`;

  return new Response(`${body.trim()}\n`, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
};
