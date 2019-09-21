import React from 'react'
import { connect } from 'react-redux'
import { removePublication } from '../../actions/publicationsActions'
import { useLoading } from '../../hooks/useLoading'
import { urlApi } from '../../utils/urlApi'
import { FaTrash } from 'react-icons/fa'

const ProfilePublications = ({publications,removePublication}) => {
  const [loading,setLoading] = useLoading(false)
  const handleRemovePublication = (idPublication,idCover) => removePublication({
    url : `${urlApi}/publications/${idPublication}`,
    stateRequest : setLoading,
    idCover
  })

  return (
    <section>
      <h3>Tus publicaciones</h3>
      <div className='profileUser_publicationsContainer'>
        {
          publications.map( publication => (
            <div className='profileUser_publication' key={publication._id}>
              <img src={publication.cover} alt="cover"/>
              <div className="profileUser_publicationTrash">
                {
                  loading ? 
                  'Eliminando...'
                  :
                  <FaTrash 
                    className='publicationTrashIcon' 
                    onClick={() => handleRemovePublication(publication._id,publication.coverId)} 
                    size={32}
                  />
                }
              </div>
            </div>
          ))
        }
      </div>
    </section>
  )
}

const mapDispatchToProps = {
  removePublication
}

export default connect(null,mapDispatchToProps)(ProfilePublications)