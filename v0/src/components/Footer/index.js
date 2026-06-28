import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import * as styles from './styles.module.css'

const FooterBar = () => {
  const { site } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          author {
            socialProfiles {
              twitter
              linkedIn
              github
            }
          }
        }
      }
    }
  `)
  const currentYear = new Date().getFullYear()

  return (
    <footer className={styles.footerBar}>
      <div className={`container flex-centered ${styles.footerInner}`}>
        <p className={styles.attr}>
          &copy;{currentYear} {site.siteMetadata.title}
        </p>
        <ul className={`${styles.socialLinks} flex-centered`}>
          {Object.entries(site.siteMetadata.author.socialProfiles).map(
            ([key, value]) => (
              <li key={key}>
                <a
                  href={value}
                  target='_blank'
                  rel='noopener noreferrer'
                  className={styles.socialLink}
                >
                  {key}
                </a>
              </li>
            )
          )}
        </ul>
      </div>
    </footer>
  )
}

export default FooterBar
