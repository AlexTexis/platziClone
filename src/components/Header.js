import React from 'react'
import { connect } from 'react-redux' 
import Nav from './Nav'
import { Link } from 'react-router-dom'
import '../styles/components/Header.scss'

const Header = ({isVisibleNav=true,user}) => {

  return ( 
    <header className='header'> 
      <div className="header_container">
        <div className="header_logoContainer">
          <Link to='/'>
              <img 
                className='header_logoImg'
                src='https://res.cloudinary.com/dhf6era2g/image/upload/v1568650159/assets/platzi_kbmfai.png' 
                alt="logo"/>
              <img 
                className='header_logoTitle'
                src='https://res.cloudinary.com/dhf6era2g/image/upload/v1568650153/assets/nameLogo_c8qa5r.png' 
                alt="name"/>
          </Link>
        </div>
        { isVisibleNav && <Nav user={user}/> }
      </div>
    </header>
  )
}

const mapStateToProps = ({userReducer}) => ({
  user : userReducer
})

export default connect(mapStateToProps)(Header) 
