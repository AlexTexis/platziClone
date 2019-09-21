import React,{useState,useRef} from 'react'
import DialogUser from './DialogUser'
import { Link } from 'react-router-dom'
import '../styles/components/Nav.scss'

const Nav = ({user}) => {
  const [dialogUser,setDialogUser] = useState(false)
  const menu = useRef(null)
  const handleDialogUser = e => (e.target.dataset.dialog) && setDialogUser(!dialogUser)
  const toggleMenu = () => { 
    if(menu.current.classList.contains('showMenu')) menu.current.classList.remove('showMenu')
    else menu.current.classList.add('showMenu')
  }

  return (
    <nav className='nav_container'>
      <div className='nav_links' ref={menu}>
        <input className='nav_linksSearch' placeholder='buscar en platzi' type="search"/>
        <ul>
          <li><Link className='nav_link' to='/challenges'>Challenges</Link></li>  
          { user.id && <li><Link className='nav_link' to='/social'>Social</Link></li> }
        </ul>
      </div>
      {
        !user.id &&
        <Link to='/signin' className='nav_btnSession'>
          Iniciar sesion 
        </Link>
      }
      {
        user.id &&
        <div className='nav_userContainer'> 
          <figure>
            <img 
              width="38"
              height="38"
              className='nav_userImg'
              src={user.avatar ? user.avatar : 'https://res.cloudinary.com/dhf6era2g/image/upload/v1568650159/assets/platzi_kbmfai.png'} 
              alt="coverUser"/>
          </figure>
          <span className='nav_userArrow' data-dialog onClick={handleDialogUser}>{'<'}</span>
          { dialogUser && <DialogUser userName={user.username}/> }
        </div>
      }
      <p className='nav_menu' onClick={toggleMenu}>Menu</p>
      <div className='nav_searchContainer'>
        <input className='nav_search' placeholder='buscar en platzi' type="search"/>
      </div>
    </nav>
  )
}

export default Nav