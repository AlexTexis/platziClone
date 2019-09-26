const initialState = {
  publications : null,//object of publications(normalize data)
  selected : null //id publication selected
}

function publications(state=initialState,action) {
  let idPublication
  switch(action.type) {
    case 'SET_PUBLICATIONS':
      return {
        ...state,
        publications : action.payload
      }
    case 'SET_PUBLICATION_SELECTED':
      return {
        ...state,
        selected : action.payload
      }
    case 'ADD_PUBLICATION_NEW':
      idPublication = action.payload._id
      let newPublication = { [idPublication] : action.payload }
      return {
        ...state,
        publications : Object.assign(newPublication,state.publications)
      }
    case 'REMOVE_PUBLICATION':
      idPublication = action.payload
      const removePublication = (publications,idRemoved) => {
        delete publications[idRemoved]
        return publications
      }
      return {
        ...state,
        publications : removePublication(state.publications,idPublication)
      }
    case 'UPDATE_AVATAR_OWNER' :
      const updateAvatarOwner = (publications,idUser,avatar) => {
        let publicationsUpdated = {}
        Object.keys(publications).forEach( id => {
          if(publications[id].ownerId === idUser) {publications[id].ownerAvatar = avatar}
          publicationsUpdated = { ...publicationsUpdated, [id] : { ...publications[id] } }
        })
        return publicationsUpdated
      }
      return {
        ...state,
        publications : updateAvatarOwner(state.publications,action.payload.idUser,action.payload.avatar)
      }
    case 'ADD_LIKE':
      idPublication = action.payload.idPublication
      return {
        ...state,
        publications : {
          ...state.publications,
          [idPublication] : {
            ...state.publications[idPublication],
            liked : true,
            likes : [
              ...state.publications[idPublication].likes,
              action.payload.data
            ]
          }
        }
      }
    case 'REMOVE_LIKE':
      idPublication = action.payload.idPublication
      return {
        ...state,
        publications : {
          ...state.publications,
          [idPublication] : {
            ...state.publications[idPublication],
            likes : state.publications[idPublication].likes.filter( like => like._id !== action.payload.idLike ),
            liked : false,
          }
        }
      }
    case 'ADD_COMMENT':
      idPublication = action.payload.idPublication
      let commentNew =  action.payload.comment
      return {
        ...state,
        publications : {
          ...state.publications,
          [idPublication] : {
            ...state.publications[idPublication],
            commenters : [
              ...state.publications[idPublication].commenters,
              commentNew
            ]
          }
        }
      }
    case 'REMOVE_COMMENT':
      idPublication = action.payload.idPublication
      let commentId = action.payload.idComment
      return {
        ...state,
        publications : {
          ...state.publications,
          [idPublication] : {
            ...state.publications[idPublication],
            commenters : state.publications[idPublication].commenters.filter( comment => comment._id !== commentId)
          }
        }
      }
    case 'ADD_LIKE_COMMENT':
      idPublication = action.payload.idPublication
      return {
        ...state,
        publications : {
          ...state.publications,
          [idPublication] : {
            ...state.publications[idPublication],
            commenters : state.publications[idPublication].commenters.map( comment => {
              if(comment._id === action.payload.idComment){ 
                comment.liked = true
                comment.likes.push(action.payload.like)
              }
              return comment
            })
          }
        }
      }
    case 'REMOVE_LIKE_COMMENT':
      idPublication = action.payload.idPublication
      return {
        ...state,
        publications : {
          ...state.publications,
          [idPublication] : {
            ...state.publications[idPublication],
            commenters : state.publications[idPublication].commenters.map( comment => {
              if(comment._id === action.payload.idComment){ 
                comment.liked = false
                comment.likes = comment.likes.filter( like => like.idUser !== action.payload.idUser)
              }
              return comment
            })
          }
        }
      }
    default :
      return state
  }
}

export default publications