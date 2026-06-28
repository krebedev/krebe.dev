const createPages = async ({ actions, graphql }) => {
  const { createPage } = actions

  const { data } = await graphql(`
    query {
      allMdx(sort: { fields: frontmatter___date, order: DESC }) {
        edges {
          node {
            id
            frontmatter {
              type
              title
            }
            slug
          }
        }
      }
    }
  `)

  // Project pages
  const projects = data.allMdx.edges.filter(
    (edge) => edge.node.frontmatter.type === 'project'
  )

  projects.forEach((project, i) => {
    const id = project.node.id
    const next = i === projects.length - 1 ? null : projects[i + 1]
    const previous = i === 0 ? null : projects[i - 1]

    createPage({
      path: project.node.slug,
      component: require.resolve('./src/components/ProjectTemplate/index.js'),
      context: {
        id,
        next,
        previous,
      },
    })
  })

  // Posts pages
  const posts = data.allMdx.edges.filter(
    (edge) => edge.node.frontmatter.type === 'blog'
  )

  posts.forEach((post, i) => {
    const id = post.node.id
    const next = i === posts.length - 1 ? null : posts[i + 1]
    const previous = i === 0 ? null : posts[i - 1]

    createPage({
      path: post.node.slug,
      component: require.resolve('./src/components/BlogTemplate/index.js'),
      context: {
        id,
        next,
        previous,
      },
    })
  })
}

exports.createPages = createPages
