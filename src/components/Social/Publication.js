import React from 'react'
import { FaCommentDots,FaHeart } from 'react-icons/fa'
import { MdMessage } from 'react-icons/md'
import { setPublicationSelected,addLike,removeLike } from '../../actions/publicationsActions'
import { connect } from 'react-redux'
import { urlApi } from '../../utils/urlApi'
import '../../styles/components/Social/Publication.scss'

const Publication = ({showDialogComments,id,setPublicationSelected,publications,addLike,removeLike,user}) => {
  const {
    ownerName,
    cover,
    liked,
    likes,
    commenters,
    description
  } = publications[id]

  const handleComments = () => {
    setPublicationSelected(id)
    showDialogComments()
  } 
  const handleLikes = () => addLike({
    url : `${urlApi}/publications/${id}/likes`,
    data : {
      userId : user.id,
      userName :  user.username,
      idPublication : id
    }
  }) 
  const handleDislikes = () => removeLike({
    url : `${urlApi}/publications/${id}/likes/${findIdLike()}`,
  })
  const findIdLike = () => likes.find( like => like.userId === user.id )._id


  return (
    <article className='publication'>
      <div className='publication__container'>
        <div className="publication__owner">
          <span className='publication_nameOwner'>{ownerName}</span>
        </div>
        <div className="publication__cover">
          <img src={cover} alt=""/>
        </div>
        <div className='publication_toolbar'>
          <div className="publication__icon publication_iconMessage" onClick={handleComments}>
            <FaCommentDots size={32}/>
          </div>
          <div className={`publication__icon publication_iconlike ${liked ? 'true': 'false'}`}>
            {
              liked ?
              <FaHeart size={32} onClick={handleDislikes}/>
              :
              <FaHeart size={32} onClick={handleLikes}/>
            }
          </div>
          <div className="publication__stats">
            <div>
              <span className='publication__countLikes'><FaHeart size={15} color={liked ? '#F53B66' : "#262626"}/>{likes.length}</span>
              <span className='publication__countComments'><MdMessage color='#262626' size={15}/>{commenters.length}</span>
            </div>
            <div>
              <p>{description}</p>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

const mapStateToProps = ({ publicationsReducer,userReducer }) => ({
  publications : publicationsReducer.publications,
  user : userReducer
})

const mapDispatchToProps = {
  setPublicationSelected,
  addLike,
  removeLike
}

export default connect(mapStateToProps,mapDispatchToProps)(Publication)