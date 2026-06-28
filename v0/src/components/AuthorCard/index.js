import React from 'react'
import { StaticImage } from 'gatsby-plugin-image'
import * as styles from './styles.module.css'

const AuthorCard = ({ author }) => {
  const { name, jobTitle, bio } = author

  return (
    <div className={`${styles.authorCard} flex-centered`}>
      <div className={styles.avatarBox}>
        <StaticImage
          src={'../../images/krebeDev.jpg'}
          width={100}
          height={100}
          placeholder='blurred'
          alt={'krebeDev'}
          className={styles.authorAvatar}
        />
      </div>

      <div className={styles.copy}>
        <h3 className={styles.authorName}>{name}</h3>
        <p className={styles.jobTitle}>{jobTitle}</p>
        <p>{bio}</p>
      </div>
    </div>
  )
}

export default AuthorCard
