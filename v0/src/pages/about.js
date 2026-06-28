import React from 'react'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import Layout from './../components/Layout'
import Cta from './../components/Cta'
import * as styles from '../pages-styles/about.module.css'

const About = ({ data }) => {
  const { siteMetadata } = data.site
  return (
    <Layout>
      <Helmet title={`About | ${siteMetadata.title}`} />
      <section>
        <div className={`container-small`}>
          <h1 className={styles.pageTitle}>{data.mdx.frontmatter.title}</h1>
          <article>
            <div>
              <MDXRenderer>{data.mdx.body}</MDXRenderer>
            </div>
          </article>
        </div>
      </section>
      <Cta />
    </Layout>
  )
}

export default About

export const query = graphql`
  query AboutPageQuery {
    site {
      siteMetadata {
        author {
          name
          jobTitle
        }
        title
      }
    }
    mdx(slug: { eq: "about/about" }) {
      frontmatter {
        title
      }
      body
    }
  }
`
