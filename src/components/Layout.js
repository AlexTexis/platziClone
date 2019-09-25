import React from 'react'
import Header from './Header'
import Footer from './Footer'
import '../styles/components/Layout.scss'

const Layout = ({children,isVisibleNav,isVisivleFooter,className}) => {
  return (
    <div className={`layout ${className}`}>
      <Header isVisibleNav={isVisibleNav}/>
      <div className='content'>
        {
          children
        }
      </div>
      <Footer isVisivleFooter={isVisivleFooter}/>
    </div>
  )
}

export default Layout