import React from 'react'
import DialogContainer from '../DialogContainer'
import OverlayContainer from '../OverlayContainer'
import Comment from './Comment'
import { connect } from 'react-redux'
import { useLoading } from '../../hooks/useLoading'
import { useInputValue } from '../../hooks/useInputValue'
import { addComment } from '../../actions/publicationsActions'
import { urlApi } from '../../utils/urlApi'
import '../../styles/components/Social/DialogComments.scss'

const DialogComments = ({hideDialog,publications,selected,addComment,user}) => {
  const handleHideDialog = (e) => (e.target.dataset.overlay === 'dialog-comments') && hideDialog()
  const [loading,setLoading] = useLoading(false)
  const comment = useInputValue('')
  const commenters = publications[selected].commenters
  const handleAddComment = e => {
    e.preventDefault()
    addComment({
      url : `${urlApi}/publications/comments`,
      stateRequest : setLoading,
      data : {
        idPublication : selected,
        userName :user.username,
        userId :user.id,
        comment : comment.value
      }
    })
  }

  return (
    <DialogContainer>
      <OverlayContainer onClick={handleHideDialog} dataSet='dialog-comments'>
        <div className='modalComments__container'>
          <h3>Comentarios</h3>
          <div className="modalComments__list">
            {
              commenters.length > 0 ?
              commenters.map( comment => (
                <Comment 
                  {...comment} 
                  key={comment._id} 
                  user={user} 
                  idPublication={selected}/>
              ))
              :
              ( <p>Sin comentarios</p> )
            }
          </div>
          <form onSubmit={handleAddComment} className='comment_input_container'>
            <input type="text" {...comment} placeholder='Escribe algun comentario'/>
            <button type='submit'>
              {
                loading ? 
                'enviando...'
                :
                'Enviar'
              }
              </button>
          </form>
        </div>
      </OverlayContainer>
    </DialogContainer>
  )
}

const mapStateToProps = ({publicationsReducer}) => ({
  publications : publicationsReducer.publications,
  selected : publicationsReducer.selected
})

const mapDispatchToProps = {
  addComment
}

export default connect(mapStateToProps,mapDispatchToProps)(DialogComments)