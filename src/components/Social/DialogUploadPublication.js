import React,{ useState } from 'react'
import { connect } from 'react-redux'
import { createPublication } from '../../actions/publicationsActions'
import { useLoading } from '../../hooks/useLoading'
import { useInputValue } from '../../hooks/useInputValue'
import { urlApi } from '../../utils/urlApi'
import DialogContainer from '../DialogContainer'
import OverlayContainer from '../OverlayContainer'
import InputUpload from '../InputUpload'
import ErrorMessage from '../ErrorMessage'
import '../../styles/components/Social/DialogUploadPublication.scss'

const DialogUploadPublication = ({hideDialog,createPublication,user}) => {
  const [imageFile,setImageFile] = useState() //title file
  const [loading,setLoading] = useLoading(false)
  const [error,setError] = useState(null)
  const description = useInputValue('')
  const handleHideDialog = e => (e.target.dataset.overlay === 'overlay') && hideDialog() 
  const handleCreatePublication = e => {
    e.preventDefault()
    let formData = new FormData()
    formData.append('cover',imageFile)
    formData.append('description',description.value)
    formData.append('ownerId',user.id)
    formData.append('ownerName',user.username)

    createPublication({
    url : `${urlApi}/publications`,
    stateRequest : setLoading,
    data : formData
   }).then((done) => {
    setTimeout(() => hideDialog(),500)
    })
   .catch(error => setError(error))
}

  return (
    <DialogContainer>
      <OverlayContainer onClick={handleHideDialog} dataSet='overlay'>
        <div className='social__newPublicationContainer'>
          <h3>Crea una nueva publicacion</h3>
          <div className='social__newPublicationFileContainer'>
            <InputUpload getFileValue={(file) => setImageFile(file)} titleLabel='Selecciona una imagen'/>
          </div>
          <form onSubmit={handleCreatePublication}>
            <input 
              type="text"
              placeholder='Escribe algo'
              className='social_newPublicationInputWrite'
              {...description}
              />
            { error && <ErrorMessage error={error}/> }
            <button 
              type='submit' 
              className='social__newPublicationBtnToPost'
              disabled={description.value ? false : true}
              >
             {
               loading ? 
               'Publicando...'
               :
               'Publicar'
             } 
            </button>
          </form>
        </div>
      </OverlayContainer>
    </DialogContainer>
  )
}

const mapDispatchToProps = {
  createPublication
}

export default connect(null,mapDispatchToProps)(DialogUploadPublication)