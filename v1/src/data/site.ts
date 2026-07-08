export const site = {
  title: "krebe.dev",
  wordmark: "krebeDev",
  name: "Solomon Ekrebe",
  jobTitle: "Software Developer",
  heroStatement: "Making complex things feel simple.",
  description:
    "Software engineer building AI products, developer tools, and scalable web applications.",
  url: "https://www.krebe.dev",
  socialImage: {
    path: "/thumbnail.png",
    width: 2412,
    height: 1252,
    alt: "Solomon Ekrebe — Software Developer. Making complex things feel simple.",
  },
  email: "hello@krebe.dev",
  closing:
    "If you're building something to solve a niche problem, I'd like to hear about it.",
  employer: {
    name: "Spark Plugin",
    url: "https://www.sparkplugin.com/",
  },
  social: {
    github: "https://github.com/krebedev",
    linkedIn: "https://www.linkedin.com/in/krebedev/",
  },
} as const;

export const nav = [{ label: "About", href: "/#story" }] as const;
