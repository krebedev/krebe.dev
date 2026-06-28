import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { Link, graphql } from 'gatsby'
import Layout from './../../components/Layout'
import * as styles from '../../pages-styles/blog.module.css'

const BlogPage = ({ data }) => {
  const ALL_POSTS = 'All Posts'
  const tags = data.allMdx.nodes
    .map(({ frontmatter: { tags } }) => tags)
    .reduce((acc, curr) => [...new Set([...[ALL_POSTS], ...acc, ...curr])])

  const [blogs, setBlogs] = useState(data.allMdx.nodes)
  const [filter, setFilter] = useState(ALL_POSTS)

  useEffect(() => {
    const filtered = data.allMdx.nodes.filter(
      ({ frontmatter }) => frontmatter.tags.indexOf(filter) > -1
    )
    setBlogs((cs) => (filter === ALL_POSTS ? data.allMdx.nodes : filtered))
  }, [filter, data.allMdx.nodes])

  return (
    <Layout>
      <Helmet title={`Blog | ${data.site.siteMetadata.title}`} />
      <section>
        <div className={`container`}>
          <h1>Blog</h1>
          <p>These are the articles and tutorials I'm currently working on.</p>

          <ul className={styles.tags}>
            {tags.map((tag) => (
              <li key={tag} className={`${styles.tag}`}>
                <button
                  className={`${styles.tagBtn} ${
                    filter === tag && styles.activeBtn
                  }`}
                  onClick={() => setFilter(tag)}
                >
                  {tag}
                </button>
              </li>
            ))}
          </ul>

          <ul className={`${styles.postList}`}>
            {blogs.map(({ id, slug, timeToRead, frontmatter }) => (
              <li key={id} className={styles.post}>
                <Link to={`/${slug}`}></Link>
                <h2>
                  <Link to={`/${slug}`}>{frontmatter.title}</Link>
                </h2>
                <small>
                  {frontmatter.date}. {timeToRead} min read
                </small>
                <p className={styles.intro}>
                  {frontmatter.overview}{' '}
                  <Link
                    to={`/${slug}`}
                    state={{ name: 'Solomon' }}
                    className={styles.moreLink}
                  >
                    Continue reading...
                  </Link>
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </Layout>
  )
}

export const query = graphql`
  query BlogPageQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(
      filter: { frontmatter: { type: { eq: "blog" } } }
      sort: { fields: frontmatter___date, order: DESC }
    ) {
      nodes {
        id
        slug
        timeToRead
        frontmatter {
          date(formatString: "MMMM D, YYYY")
          title
          tags
          overview
        }
      }
    }
  }
`
export default BlogPage
