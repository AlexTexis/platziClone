import React from 'react'
import '../../styles/components/Profile/ProfileContainer.scss'

const ProfileContainer = ({children}) => (
  <section className='profile'>
    <div className='profile__container'>
      <h2>Editar perfil</h2>
      <div className='profile__gridContainer'>
        {
          children
        }
      </div>
    </div>
  </section>
)

export default ProfileContainer