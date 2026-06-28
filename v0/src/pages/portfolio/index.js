import React, { useEffect, useState } from 'react'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'
import Layout from './../../components/Layout'
import ProjectCards from './../../components/ProjectCards'
import Cta from './../../components/Cta'
import * as styles from '../../pages-styles/portfolio.module.css'

const Projects = ({ data }) => {
  const ALL_PROJECTS = 'All Projects'

  const [projects, setProjects] = useState(data.allMdx.nodes)
  const [filter, setFilter] = useState(ALL_PROJECTS)
  const [isFiltering, setIsFiltering] = useState(false)
  const isSingle = projects.length === 1

  const tags = data.allMdx.nodes
    .map(({ frontmatter: { tags } }) => tags)
    .reduce((acc, curr) => [...new Set([...[ALL_PROJECTS], ...acc, ...curr])])

  useEffect(() => {
    const filtered = data.allMdx.nodes.filter(
      ({ frontmatter }) => frontmatter.tags.indexOf(filter) > -1
    )
    setProjects((cs) =>
      filter === ALL_PROJECTS ? data.allMdx.nodes : filtered
    )
    setIsFiltering(true)

    const timerId = setTimeout(() => {
      setIsFiltering(false)
    }, 1000)

    return () => clearTimeout(timerId)
  }, [filter, data.allMdx.nodes])

  return (
    <Layout>
      <Helmet title={`Projects | ${data.site.siteMetadata.title}`} />
      <section>
        <div className={`container`}>
          <h1>Software Developer Portfolio</h1>
          <p>
            A collection of my featured projects. You can find more of my work
            on{' '}
            <a
              rel='noopenner noreferre'
              href={data.site.siteMetadata.author.socialProfiles.github}
              className={styles.githubLink}
            >
              Github
            </a>
            .
          </p>
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
          {!isFiltering && (
            <p>
              {filter === ALL_PROJECTS
                ? `Showing ${ALL_PROJECTS.toUpperCase()}: Apply the above filters to list them by tool or technology.`
                : `Showing ${projects.length} Project${
                    isSingle ? '' : 's'
                  } filtered by ${filter.toUpperCase()}`}
            </p>
          )}
          <div className={styles.projectList}>
            <ProjectCards projects={projects} />
            {isFiltering && (
              <div className={styles.filtering}>
                <p className={styles.filterStatus}>
                  Filtering projects by: {filter}...{' '}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
      <Cta />
    </Layout>
  )
}

export default Projects

export const query = graphql`
  query ProjectsPageQuery {
    site {
      siteMetadata {
        title
        author {
          socialProfiles {
            github
          }
        }
      }
    }
    allMdx(
      filter: { frontmatter: { type: { eq: "project" } } }
      sort: { fields: frontmatter___date, order: DESC }
    ) {
      nodes {
        id
        slug
        frontmatter {
          title
          tags
          bgColor
          txtColor
          featuredImage {
            childImageSharp {
              gatsbyImageData(width: 675)
            }
          }
        }
      }
    }
  }
`
