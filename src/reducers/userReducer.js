import { getCookie } from '../utils/getCookieValue'

const initialState = {
  id : getCookie('id'),
  avatar : getCookie('avatar'),
  email :  getCookie('email'),
  username : getCookie('username'),
  information : {
    //datos que se cargaran al perdir los datos del usuario
    // publications : [],
    // interests : [],
    // listAvatars : []
  },
}

function user(state=initialState,action) {
  switch(action.type) {
    case 'SET_INFORMATION_USER':
      return {
        ...state,
        information : {
          interests : action.payload.interests || [],
          publications : action.payload.publications || [],
          listAvatars : action.payload.listAvatars || [],
        }
      }
    case 'SET_AVATAR' :
      return {
        ...state,
        avatar : action.payload
      } 
    case 'UPDATE_AVATAR' :
      return {
        ...state,
        avatar : action.payload
      } 
    case 'UPDATE_INTERESTS' :
      return {
        ...state,
        information : {
          ...state.information,
          interests : action.payload
        }
      } 
    case 'ADD_AVATAR_TO_LIST_AVATARS' :
      return {
        ...state,
        information : {
          ...state.information,
          listAvatars : [
            ...state.information.listAvatars,
            action.payload
          ]
        }
      } 
    case 'REMOVE_AVATAR_TO_LIST_AVATARS' :
      return {
        ...state,
        information : {
          ...state.information,
          listAvatars : state.information.listAvatars.filter( avatar => avatar.avatarId !== action.payload )
        }
      } 
    case 'ADD_PUBLICATION_TO_LIST_PUBLICATIONS' : 
      return {
        ...state,
        information : {
          ...state.information,
          publications : [
            ...state.information.publications,
            action.payload
          ]
        }
      }
    case 'REMOVE_PUBLICATION_TO_LIST_PUBLICATIONS' : 
      return {
        ...state,
        information : {
          ...state.information,
          publications : state.information.publications.filter( publication => publication._id !== action.payload)
        }
      }
    default :
      return state
  }
}

export default user