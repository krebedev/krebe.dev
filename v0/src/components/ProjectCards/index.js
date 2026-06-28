import React from 'react'
import { Link } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import * as styles from './styles.module.css'

const ProjectCards = ({ projects }) => {
  const projectList = projects.map(({ frontmatter, id, slug }) => (
    <li
      key={id}
      className={styles.projectCard}
      style={{
        backgroundColor: frontmatter.bgColor,
      }}
    >
      <Link to={`/${slug}`}>
        <h2
          className={styles.projectName}
          style={{
            color: frontmatter.txtColor,
          }}
        >
          {frontmatter.title}
        </h2>
        <ul className={styles.tagList}>
          {frontmatter.tags.map((tag) => (
            <li className={styles.tag} key={id + tag}>
              {tag}
            </li>
          ))}
        </ul>
        <div className={styles.projectScreen}>
          <GatsbyImage
            image={getImage(frontmatter.featuredImage)}
            alt={frontmatter.title}
          />
        </div>
      </Link>
    </li>
  ))

  return (
    <ul className={`flex-centered ${styles.projectList}`}>{projectList}</ul>
  )
}

export default ProjectCards
