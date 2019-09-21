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
    default :
      return state
  }
}

export default publications