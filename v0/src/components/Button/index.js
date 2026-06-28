import React from 'react'
import { Link } from 'gatsby'
import { buttonStyles } from './styles.module.css'

const Button = ({ pathname, title }) => {
  return (
    <Link to={pathname} className={buttonStyles}>
      {title}
    </Link>
  )
}

export default Button
