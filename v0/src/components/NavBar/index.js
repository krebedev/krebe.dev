import React, { useState } from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import Logo from '../icons/Logo'
import HamburgerIcon from '../icons/Hamburger'
import CloseIcon from '../icons/CloseIcon'
import * as styles from './styles.module.css'

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const { site } = useStaticQuery(graphql`
    query MenuQuery {
      site {
        siteMetadata {
          navMenu {
            title
            menuLink
          }
        }
      }
    }
  `)

  const toggleMenu = () => {
    setIsOpen((currentState) => !currentState)
  }

  const navLinks = site.siteMetadata.navMenu.map(({ title, menuLink }) => (
    <li key={title} className={styles.navItem}>
      <Link
        onClick={() => setIsOpen(false)}
        to={menuLink}
        className={`${styles.navLink} flex-centered`}
      >
        {title}
      </Link>
    </li>
  ))

  return (
    <header className={styles.navBar}>
      <nav className={`container flex-centered`}>
        <Link
          to='/'
          title='Back to home'
          aria-label='krebeDev logo'
          className={styles.logoAnchor}
        >
          <Logo />
        </Link>

        <button
          className={styles.toggleButton}
          onClick={toggleMenu}
          title='Menu'
          aria-label='toggle button'
        >
          {isOpen ? (
            <span className={styles.closeIconBox}>
              <CloseIcon />
            </span>
          ) : (
            <span className={styles.hamburgerIconBox}>
              <HamburgerIcon />
            </span>
          )}
        </button>

        <ul className={`${styles.navMenu} ${isOpen && styles.expand}`}>
          {navLinks}
        </ul>
      </nav>
    </header>
  )
}

export default NavBar
