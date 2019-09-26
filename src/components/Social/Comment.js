import React from 'react'
import { connect } from 'react-redux'
import { removeComment,addLikeComment,removeLikeComment } from '../../actions/publicationsActions'
import { urlApi } from '../../utils/urlApi'
import { useLoading } from '../../hooks/useLoading'
import { FaTrash,FaHeart } from 'react-icons/fa'

const CommentItem = ({removeComment,addLikeComment,removeLikeComment,_id,userName,userId,comment,likes,idPublication,user,liked}) => {
  const [loading,setLoading] = useLoading(false)
  const [loadingLikeComment,setLoadingLikeComment] = useLoading(false)
  const [loadingDislikeComment,setLoadingDislikeComment] = useLoading(false)
  const handleRemoveComment = id => removeComment({
    url : `${urlApi}/publications/${idPublication}/comments/${id}`,
    stateRequest : setLoading
  })
  const handleLikeComment = () => addLikeComment({
    url : `${urlApi}/publications/comments/${_id}`,
    stateRequest : setLoadingLikeComment,
    data : {
      idUser : user.id,
      userName : user.username
    }
  })
  const handleDislikeComment = () => removeLikeComment({
    url : `${urlApi}/publications/comments/${_id}`,
    stateRequest : setLoadingDislikeComment,
    data : {
      idUser : user.id,
    }
  })
  
  return (
  <div className="commenterItemPublication" key={_id}>
    <div>
      <h3>{userName}</h3>
      <p>{comment}</p>
      <span className='commenterItemPublication_iLikeIt' onClick={ !liked ? handleLikeComment : handleDislikeComment}>
        {
          !liked ? 
          'Me gusta'
          :
          'No me gusta'
        }
        { loadingLikeComment && '...' }
        { loadingDislikeComment && '...' }
      </span>
    </div>
    <div className='commenterItemPublication_widgetsContainer'>
      {
        loading ?
        ( <span>...</span>)
        :
        ( user.id === userId )  && <FaTrash className='commenterItemPublication_dislikeWidget' size={18} onClick={() => handleRemoveComment(_id)} />
      }
      {
        likes.length > 0 &&
      <div className='commenterItemPublication_likesContainer'>
        <div className='commenterItemPublication_likes' >
          <FaHeart size={18}/>
        </div>
        <span>{likes.length}</span>
      </div>
      }
    </div>
  </div>)
}

const mapDispatchToProps = {
  removeComment,
  addLikeComment,
  removeLikeComment
}

export default connect(null,mapDispatchToProps)(CommentItem)