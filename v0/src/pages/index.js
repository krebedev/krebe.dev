import * as React from 'react'
import { Helmet } from 'react-helmet'
import { graphql, Link } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'
import Layout from '../components/Layout'
import Button from '../components/Button'
import * as styles from '../pages-styles/index.module.css'

const HomePage = ({ data }) => {
  const { name, jobTitle } = data.site.siteMetadata.author
  return (
    <Layout>
      <Helmet title={`${jobTitle} | ${name}`} />
      <section className={styles.hero}>
        <div className={`container flex-centered ${styles.heroInner}`}>
          <article className={styles.heroCopy}>
            <h1 className={styles.heroHeading}>
              {name} <br />
              <span className={styles.highlight}>{jobTitle}</span>
            </h1>
            <p>
              I build elegant and efficient{' '}
              <Link to='/portfolio' className={styles.link}>
                web and mobile apps
              </Link>{' '}
              that provide excellent user experiences.
            </p>

            <p>
              Every once in a while, I{' '}
              <Link to='/blog' className={styles.link}>
                blog
              </Link>{' '}
              about tech and fitness. What a combo, you might wonder. But
              there's even a little more{' '}
              <Link to='/about' className={styles.link}>
                about me
              </Link>
              .
            </p>

            <div className={styles.heroCta}>
              <p>Am I the droid you're looking for?</p>
              <Button pathname={'/contact'} title={"Let's chat!"} />
            </div>
          </article>

          <div className={styles.avatarBox}>
            <StaticImage
              src='./../images/krebeDev.jpg'
              alt='Solomon Ekrebe'
              placeholder='dominantColor'
              width={792}
              height={908}
              className={styles.avatar}
            />
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default HomePage

export const query = graphql`
  query HomePageQuery {
    site {
      siteMetadata {
        author {
          jobTitle
          name
        }
      }
    }
    allMdx(
      filter: { frontmatter: { featuredProject: { gte: 0 } } }
      sort: { fields: frontmatter___featuredProject, order: ASC }
    ) {
      nodes {
        frontmatter {
          title
          tags
          bgColor
          txtColor
          featuredImage {
            childImageSharp {
              gatsbyImageData(width: 600)
            }
          }
        }
        slug
        id
      }
    }
  }
`

// Fix button styles location
