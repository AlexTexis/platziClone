import React from 'react'
import Header from './Header'

const Layout = ({children,isVisibleNav}) => {
  return (
    <div className='layout'>
      <Header isVisibleNav={isVisibleNav}/>
      <div>
        {
          children
        }
      </div>
    </div>
  )
}

export default Layout