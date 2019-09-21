import React,{useState} from 'react'
import { connect } from 'react-redux'
import { updateAvatarUser,removeAvatar } from '../../actions/userActions'
import { urlApi } from '../../utils/urlApi'
import { useLoading } from '../../hooks/useLoading'
import { FaTrash } from 'react-icons/fa'
import OverlayContainer from '../OverlayContainer'
import DialogContainer from '../DialogContainer'
import '../../styles/components/Profile/DialogSelectPhoto.scss'

const ImageItem = ({removeAvatar,setImageSelected,avatar,avatarId,userId}) => {
  const [loading,setLoading] = useLoading(false)
  const handleSelectedImage = e => {
    let image = e.target
    let listImages = document.getElementsByClassName('dialogSelectPhoto_img')
    for(let i = 0;i < listImages.length;i++) {
      if(listImages[i].classList.contains('selected')) listImages[i].classList.remove('selected')
    }
    image.classList.add('selected')
    setImageSelected(e.target.dataset.avatar)
  }

  const handleRemoveAvatar = () => removeAvatar({
    url : `${urlApi}/users/${userId}/avatar`,
    stateRequest : setLoading,
    avatarId : avatarId
  })

  return (
     <div className='dialogSelectPhoto_imgContainer'>
        <img 
          src={avatar} 
          alt={avatar}
          data-avatar_id={avatarId}
          data-avatar={avatar}
          className='dialogSelectPhoto_img' 
          onClick={handleSelectedImage} 
        />
        <div className='dialogSelectPhoto_trashImage'>
          { loading ? '...' : <FaTrash size={20} onClick={handleRemoveAvatar} /> }
        </div>
      </div>
      )
}

const DialogSelectPhoto = ({hideDialog,user,updateAvatarUser,removeAvatar}) => {
  const [ imageSelected,setImageSelected ] = useState(null)
  const [ loading,setLoading ] = useLoading(false)
  const handleHideDialog = e => e.target.dataset.overlay === 'overlayDialogSelectPhoto' && hideDialog()
  const handleUpdateAvatar = () => updateAvatarUser({
    url : `${urlApi}/users/${user.id}/avatar`,
    stateRequest : setLoading,
    avatar : imageSelected
  })
  .then( ok => setTimeout(() => hideDialog(),500) )

  return ( 
    <DialogContainer>
        <OverlayContainer dataSet='overlayDialogSelectPhoto' onClick={handleHideDialog}>
          <div className='dialogSelectPhoto_container'>
            <h3>Tus fotos</h3>
            <div className='dialogSelectPhoto_imagesContainer'>
              {
                user.information.listAvatars.length ?
                user.information.listAvatars.map( avatar => (
                  <ImageItem 
                    key={avatar.avatarId} {...avatar} 
                    setImageSelected={setImageSelected}
                    removeAvatar={removeAvatar}
                    userId={user.id}
                    />
                ))
                :
                <p>No tienes fotos subidas</p>
              }
            </div>
            <button disabled={imageSelected ? false : true} onClick={handleUpdateAvatar}>
              {
                loading ? 
                'Actualizando...'
                :
                'Actualizar foto' 
              }
            </button>
          </div>
        </OverlayContainer>
    </DialogContainer>
  )
}

const mapDispatchToProp = {
  updateAvatarUser,
  removeAvatar
}

export default connect(null,mapDispatchToProp)(DialogSelectPhoto)