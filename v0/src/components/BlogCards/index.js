import React from 'react'
import { graphql, Link, useStaticQuery } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import * as styles from './styles.module.css'

const BlogCards = (props) => {
  const query = useStaticQuery(graphql`
    query LatestPosts {
      allMdx(
        filter: { frontmatter: { type: { eq: "blog" } } }
        sort: { fields: frontmatter___date, order: DESC }
        limit: 3
      ) {
        nodes {
          frontmatter {
            title
            date
            overview
            featuredImage {
              childImageSharp {
                gatsbyImageData(width: 600)
              }
            }
          }
          id
          slug
        }
      }
    }
  `)

  return (
    <ul className={`${styles.blogCards} flex-centered`}>
      {query.allMdx.nodes.map(({ frontmatter, id, slug }) => (
        <li key={id} className={styles.blogCard}>
          <article>
            <Link to={slug}>
              <GatsbyImage
                image={getImage(frontmatter.featuredImage)}
                alt={frontmatter.title}
                className={styles.featuredImage}
              />
            </Link>
            <div className={styles.copy}>
              <h3 className={styles.title}>
                <Link to={slug}>{frontmatter.title}</Link>
              </h3>
              <p>{frontmatter.overview}</p>
            </div>
          </article>
        </li>
      ))}
    </ul>
  )
}

export default BlogCards
