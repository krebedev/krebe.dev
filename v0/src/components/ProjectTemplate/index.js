import React from 'react'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons'
import Layout from '../Layout'
import Recommends from '../Recommends'
import { buttonStyles } from '../Button/styles.module.css'
import * as styles from './styles.module.css'

const Project = ({ data, pageContext }) => {
  const { title, overview, liveUrl, gitRepo, featuredImage } =
    data.mdx.frontmatter
  const image = getImage(featuredImage)
  const { next, previous } = pageContext

  return (
    <Layout>
      <Helmet title={`${title} | ${data.site.siteMetadata.title}`} />
      <section>
        <div className={`container-small`}>
          <div>
            <h1>{title}</h1>
            <p>{overview}</p>
            <div className={styles.projectLinks}>
              {liveUrl && (
                <div className={styles.linkBox}>
                  <a
                    href={liveUrl}
                    target='_blank'
                    rel='noopenner noreferrer'
                    className={buttonStyles}
                  >
                    <span className={styles.linkIcon}>
                      <FontAwesomeIcon icon={faExternalLinkAlt} />
                    </span>
                    Live Site
                  </a>
                </div>
              )}
              {gitRepo && (
                <div className={styles.linkBox}>
                  <a
                    href={gitRepo}
                    target='_blank'
                    rel='noopenner noreferrer'
                    className={buttonStyles}
                  >
                    <span className={styles.linkIcon}>
                      <FontAwesomeIcon icon={faExternalLinkAlt} />
                    </span>
                    Source Code
                  </a>
                </div>
              )}
            </div>
          </div>
          <div>
            <GatsbyImage image={image} alt={title} />
          </div>
          <article className={styles.projectDetails}>
            <MDXRenderer>{data.mdx.body}</MDXRenderer>
          </article>
          <Recommends {...{ next, previous }} />
        </div>
      </section>
    </Layout>
  )
}

export default Project

export const query = graphql`
  query ($id: String) {
    mdx(id: { eq: $id }) {
      frontmatter {
        title
        overview
        liveUrl
        gitRepo
        featuredImage {
          childImageSharp {
            gatsbyImageData(width: 1024)
          }
        }
      }
      body
    }
    site {
      siteMetadata {
        title
      }
    }
  }
`
