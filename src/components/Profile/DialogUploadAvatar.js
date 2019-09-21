import React,{useState} from 'react'
import InputUpload from '../InputUpload'
import DialogContainer from '../DialogContainer'
import OverlayContainer from '../OverlayContainer'
import ErrorMessage from '../ErrorMessage'
import { uploadAvatar } from '../../actions/userActions'
import { connect } from 'react-redux'
import { urlApi } from '../../utils/urlApi'
import { useLoading } from '../../hooks/useLoading'
import '../../styles/components/Profile/DialogUploadAvatar.scss'

const DialogUploadAvatar = ({hideDialog,uploadAvatar,user}) => {
  const [imageFile,setImageFile] = useState(false)
  const [error,setError] = useState(null)
  const [loading,setLoading] = useLoading(false)
  const hideModal = e => e.target.dataset.overlay === 'overlayUploadAvatar' && hideDialog()
  const handleUpdateAvatar = () => {
    let formData = new FormData()
    formData.append('avatar',imageFile)
    uploadAvatar({
      url : `${urlApi}/users/${user.id}/avatar`,
      stateRequest : setLoading,
      data : formData
    })
    .then((done) => {
      setTimeout(() => hideDialog(),500)
    })
    .catch( error => setError(error) )
  }

  return (
    <DialogContainer>
      <OverlayContainer onClick={hideModal} dataSet='overlayUploadAvatar'>
        <div className='modalUploadAvatar_container'>
          <h3>Sube una foto</h3>
          <InputUpload getFileValue={(file) => setImageFile(file)} titleLabel='Selecciona una imagen'/>
          { error && <ErrorMessage error={error}/> }
          <button disabled={imageFile ? false : true} className='uploadAvatar_btn' onClick={handleUpdateAvatar}>
            {
              loading ?
              'Subiendo...' 
              :
              'Subir'
            }
          </button>
        </div>
      </OverlayContainer>
    </DialogContainer>
  )
}

const mapStateToProps = ({userReducer}) => ({
  user : userReducer
})

const mapDispatchToProps = {
  uploadAvatar
}

export default connect(mapStateToProps,mapDispatchToProps)(DialogUploadAvatar)