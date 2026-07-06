export const site = {
  title: "krebe.dev",
  wordmark: "krebeDev",
  name: "Solomon Ekrebe",
  jobTitle: "Software Developer",
  heroStatement: "Making complex things feel simple.",
  description:
    "Personal site of Solomon Ekrebe, a software developer at Spark Plugin. A scroll-reveal story about building dependable software, plus contact details.",
  url: "https://www.krebe.dev",
  socialImage: {
    path: "/thumbnail.png",
    width: 2412,
    height: 1252,
    alt: "Solomon Ekrebe — Software Developer. Making complex things feel simple.",
  },
  email: "hello@krebe.dev",
  closing:
    "If you're building something people will rely on, I'd like to hear about it.",
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
