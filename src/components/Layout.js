import React from 'react'
import Header from './Header'
import Footer from './Footer'

const Layout = ({children,isVisibleNav,isVisivleFooter}) => {
  return (
    <div className='layout'>
      <Header isVisibleNav={isVisibleNav}/>
      <div>
        {
          children
        }
      </div>
      <Footer isVisivleFooter={isVisivleFooter}/>
    </div>
  )
}

export default Layout