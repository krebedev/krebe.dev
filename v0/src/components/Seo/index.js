import React from 'react'
import { Helmet } from 'react-helmet'
import { useLocation } from '@reach/router'
import { useStaticQuery, graphql } from 'gatsby'
import imageUrl from '../../images/desktop-preview.png'

const Seo = () => {
  const { pathname } = useLocation()
  const siteQuery = useStaticQuery(graphql`
    query siteMeta {
      site {
        siteMetadata {
          title
          description
          siteUrl
          twitterUserName
          image
        }
      }
    }
  `)
  const { title, description, siteUrl, twitterUserName, image } =
    siteQuery.site.siteMetadata

  return (
    <Helmet>
      <html lang='en' />
      <meta name='description' content={description} />
      <meta property='og:url' content={`${siteUrl}${pathname}`} />
      <meta property='og:title' content={title} />
      <meta property='og:description' content={description} />
      <meta property='og:image' content={imageUrl} />

      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:title' content={title} />
      <meta name='twitter:creator' content={twitterUserName} />
      <meta name='twitter:description' content={description} />
      <meta name='twitter:image' content={imageUrl} />
    </Helmet>
  )
}

export default Seo
