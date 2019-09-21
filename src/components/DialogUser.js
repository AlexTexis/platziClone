import React from 'react'
import { Link } from 'react-router-dom'
import { logout } from '../actions/userActions'
import '../styles/components/DialogUser.scss'

const DialogUser = ({userName}) => (
      <div className='dialogUserContainer'>
        <h3>{`¡Hola ${userName}!`}</h3>
        <Link className='dialogUserLink dialogUser__profileLink' to={`/profile`}>Mi perfil</Link>
        <p className='dialogUserLink linkCloseSession' onClick={logout}>Cerrar sesion</p>
      </div>
)

export default DialogUser