import React from 'react'
import '@fontsource/roboto'
import '@fontsource/roboto/700.css'
import NavBar from '../NavBar'
import FooterBar from '../Footer'
import Seo from '../Seo'
import './global.css'

const Layout = ({ children }) => {
  return (
    <>
      <Seo />
      <NavBar />
      <main>{children}</main>
      <FooterBar />
    </>
  )
}

export default Layout
