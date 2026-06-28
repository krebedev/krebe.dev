require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    title: "krebeDev",
    author: {
      name: "Solomon Ekrebe",
      jobTitle: "Full-Stack Developer",
      bio: "I'm passionate about clean UI/UX, accessiblity and scalable apps.",
      socialProfiles: {
        twitter: "https://twitter.com/krebedev",
        linkedIn: "https://linkedin.com/krebedev",
        github: "https://github.com/krebedev",
      },
    },
    siteUrl: "https://www.krebe.dev",
    description:
      "Full-Stack Developer, avid learner, and lover of all things tech. Building delightful, user-friendly, and accessible web and mobile apps that drive business results.",
    twitterUserName: "@krebeDev",
    image: "./src/images/krebedev-preview.png",

    navMenu: [
      {
        title: "About",
        menuLink: "/about",
      },
      {
        title: "Projects",
        menuLink: "/portfolio",
      },
      {
        title: "Blog",
        menuLink: "/blog",
      },
      {
        title: "Contact",
        menuLink: "/contact",
      },
    ],
  },

  plugins: [
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-mdx",
    "gatsby-plugin-fontawesome-css",

    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: `contents`,
        path: `${__dirname}/contents`,
      },
    },

    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/images`,
      },
    },

    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: "krebeDev",
        short_name: "krebeDev",
        start_url: "/",
        background_color: "#103e7e",
        theme_color: "#f6faff",
        display: "standalone",
        icon: "./src/images/favicon.png",
        crossOrigin: `use-credentials`,
      },
    },
  ],
};
