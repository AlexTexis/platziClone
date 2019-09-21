import React from 'react'
import { connect } from 'react-redux'
import { removeComment } from '../../actions/publicationsActions'
import { urlApi } from '../../utils/urlApi'
import { useLoading } from '../../hooks/useLoading'
import { FaTrash } from 'react-icons/fa'

const CommentItem = ({removeComment,_id,userName,userId,comment,idPublication,user}) => {
  const [loading,setLoading] = useLoading(false)
  const handleRemoveComment = id => removeComment({
    url : `${urlApi}/publications/${idPublication}/comments/${id}`,
    stateRequest : setLoading
  })
  
  return (
  <div className="commenterItemPublication" key={_id}>
    <div>
      <h3>{userName}</h3>
      <p key={_id}>{comment}</p>
    </div>
    {
      loading ?
      ( <span>...</span>)
      :
      ( user.id === userId )  && <FaTrash size={20} onClick={() => handleRemoveComment(_id)} />
    }
  </div>)
}

const mapDispatchToProps = {
  removeComment
}

export default connect(null,mapDispatchToProps)(CommentItem)