import axios from 'axios'
import { normalizerData } from '../utils/normalizerData'
import { getCookie } from '../utils/getCookieValue'
import { addPublicationToListPublications,removePublicationToListPublications } from './userActions'
import { redirectByUnauthorized } from '../utils/redirectByUnauthorized'

const setPublications = (publications) => ({
  type : 'SET_PUBLICATIONS',
  payload : publications
})

export const setPublicationSelected = (idPublication) => ({
  type : 'SET_PUBLICATION_SELECTED',
  payload : idPublication
})

export const addPublicationNew= (publication) => ({
  type : 'ADD_PUBLICATION_NEW',
  payload : publication
})

const deletePublication= (idPublication) => ({
  type : 'REMOVE_PUBLICATION',
  payload : idPublication
})

export const updateAvatarOwner = (avatar,idUser) => ({
  type : 'UPDATE_AVATAR_OWNER',
  payload  : { avatar,idUser }
})

const likeAdd = (idPublication,data) => ({
  type : 'ADD_LIKE',
  payload : { idPublication,data }
})

const likeRemove =(idPublication,idLike) => ({
  type : 'REMOVE_LIKE',
  payload : { idPublication,idLike }
})

const commentAdd = (comment,idPublication) => ({
  type : 'ADD_COMMENT',
  payload : { comment,idPublication }
})

const commentRemove = (idComment,idPublication) => ({
  type : 'REMOVE_COMMENT',
  payload : { idComment,idPublication }
})

const likeCommentAdd = (idPublication,idComment,like) => ({
  type : 'ADD_LIKE_COMMENT',
  payload : { idPublication,idComment,like }
})

const likeCommentRemove = (idPublication,idComment,idUser) => ({
  type : 'REMOVE_LIKE_COMMENT',
  payload : { idPublication,idComment,idUser }
})

//*************************************************REQUESTS********************************************************************************

export const getPublications = ({ url,stateRequest }) => dispatch => {
  return new Promise((resolve,reject) => {
    stateRequest(true)
    axios({
      url,
      method : 'GET',
      headers : {
        'Authorization' : `Bearer ${getCookie('token')}`
      }
    })
    .then(({ data }) => {
       stateRequest(false)
       dispatch(setPublications(normalizerData(data.publications)))
       resolve(true)
      })
    .catch( error => {
      stateRequest(false)
      let status = error.request.status
      let errorMessage
      error.response ? errorMessage = error.response.data.message : errorMessage = error.message
      if(status === 401 ) return redirectByUnauthorized()
      reject(errorMessage)
    })
  })
}

//ADD LIKE
export const addLike = ({url,data}) => dispatch => {
    axios({
      url,
      method : 'POST',
      headers : {
        'Authorization' : `Bearer ${getCookie('token')}`
      },
      data
    })
    .then(({data}) => {
      dispatch(likeAdd(data.idPublication,data))
    })
    .catch( error =>{
      let status = error.request.status
      let errorMessage = error.response.data.message
      if(status === 401 ) redirectByUnauthorized()
    })
}

//REMOVE LIKE
export const removeLike = ({url}) => dispatch => {
    axios({
      url,
      method : 'DELETE',
      headers : {
        'Authorization' : `Bearer ${getCookie('token')}`
      }
    })
    .then(({data}) => {
      dispatch(likeRemove(data.idPublication,data.idLike))
    })
    .catch( error =>{
      let status = error.request.status
      let errorMessage = error.response.data.message
      if(status === 401 ) redirectByUnauthorized()
    })
}

//ADD COMMENT
export const addComment = ({url,stateRequest,data}) => dispatch => {
    stateRequest(true)
    axios({
      url,
      method : 'POST',
      headers : {
        'Authorization' : `Bearer ${getCookie('token')}`
      },
      data
    })
    .then(({data}) => {
      stateRequest(false)
      dispatch(commentAdd(data,data.idPublication))
    })
    .catch(error => {
      stateRequest(false)
      let status = error.request.status
      let errorMessage = error.response.data.message
      if(status === 401 ) redirectByUnauthorized()
    })
}

//REMOVE COMMENT
export const removeComment = ({url,stateRequest}) => dispatch => {
    stateRequest(true)
    axios({
      url,
      method : 'DELETE',
      headers : {
        'Authorization' : `Bearer ${getCookie('token')}`
      }
    })
    .then(({data}) => {
      stateRequest(false)
      dispatch(commentRemove(data.idComment,data.idPublication))
    })
    .catch(error => {
      stateRequest(false)
      let status = error.request.status
      let errorMessage = error.response.data.message
      if(status === 401 ) return redirectByUnauthorized()
    })
}

//CREATE PUBLICATION
export const createPublication = ({url,stateRequest,data}) => dispatch => {
  return new Promise((resolv,reject) => {
    stateRequest(true)
    axios({
      url,
      method : 'POST',
      headers : {
        'Authorization' : `Bearer ${getCookie('token')}`
      }, 
      data
    })
    .then(({data}) => {
      resolv(true)
      stateRequest(false) 
      dispatch(addPublicationNew(data))
      dispatch(addPublicationToListPublications(data))
    })
    .catch( error => {
      stateRequest(false)
      let status = error.request.status
      let errorMessage 
      error.response ? errorMessage =  error.response.data.message : errorMessage = error.message
      if(status === 401 ) return redirectByUnauthorized()
      reject(errorMessage)
    })
  })
}

//REMOVE PUBLICATION
export const removePublication = ({url,stateRequest,idCover}) => dispatch => {
  stateRequest(true)
  axios({
    url,
    method : 'DELETE',
    headers : {
      'Authorization' : `Bearer ${getCookie('token')}`
    },
    data : { idCover } 
  })
  .then(({data}) => {
    stateRequest(false)
    dispatch(removePublicationToListPublications(data.idPublication))
    dispatch(deletePublication(data.idPublication))
  })
  .catch(error => {
    stateRequest(false)
    let status = error.request.status 
    let errorMessage = error.response.data.message
    if(status === 401) return redirectByUnauthorized()
  })
}

//ADD LIKE TO COMMENT PUBLICATION
export const addLikeComment = ({url,stateRequest,data}) => dispatch => {
  stateRequest(true) 
  axios({
    url,
    method : 'POST',
    data,
    headers : {
      'Authorization' : `Bearer ${getCookie('token')}`
    }
  })
  .then(({data}) => {
    stateRequest(false)
    dispatch(likeCommentAdd(data.publicationId,data.commentId,data.like))
  })
  .catch(error => {
    stateRequest(false)
    let status = error.request.status
    let errorMessage = error.response ? error.response.data.message : error.message
    if(status === 401) redirectByUnauthorized()
  })
}

//REMOVE LIKE TO COMMENT PUBLICATION
export const removeLikeComment = ({url,stateRequest,data}) => dispatch => {
  stateRequest(true) 
  axios({
    url,
    method : 'DELETE',
    data,
    headers : {
      'Authorization' : `Bearer ${getCookie('token')}`
    }
  })
  .then(({data}) => {
    stateRequest(false)
    dispatch(likeCommentRemove(data.publicationId,data.commentId,data.idUser))
  })
  .catch(error => {
    stateRequest(false)
    let status = error.request.status
    let errorMessage = error.response ? error.response.data.message : error.message
    if(status === 401) redirectByUnauthorized()
  })
}