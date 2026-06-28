export const site = {
  title: 'krebeDev',
  name: 'Solomon Ekrebe',
  jobTitle: 'Full-Stack Developer',
  description:
    'Full-Stack Developer building delightful, user-friendly, and accessible web and mobile apps.',
  url: 'https://www.krebe.dev',
  email: 'solomon@krebe.dev',
  social: {
    twitter: 'https://twitter.com/krebedev',
    linkedIn: 'https://linkedin.com/krebedev',
    github: 'https://github.com/krebedev',
  },
} as const;

export const nav = [
  { label: 'Home', href: '/' },
  { label: 'Contact', href: '/contact' },
] as const;
