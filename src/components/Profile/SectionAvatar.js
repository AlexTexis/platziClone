import React from 'react'
import '../../styles/components/Profile/SectionAvatar.scss'

const Avatar = ({showDialogUploadAvatar,showDialogSelectPhoto,user}) => { 
  return(
  <div className="avatar">
    <div className="avatar__container">
      { 
        user.avatar && 
        <figure>
          <img width="200" height="200" className='avatar_userProfile' src={user.avatar} alt="avatarUser"/> 
        </figure>
      }  
    </div>
    <button onClick={showDialogUploadAvatar}>Subir una foto</button>
    <button onClick={showDialogSelectPhoto}>Seleccionar una foto</button>
  </div>
)
}

export default Avatar