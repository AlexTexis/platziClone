import axios from 'axios'
import { getCookie } from '../utils/getCookieValue'
import { redirectByUnauthorized } from '../utils/redirectByUnauthorized'

export const setInformationUser = ({_id,avatar,email,interests,username,publications,listAvatars}) => ({
  type : 'SET_INFORMATION_USER',
  payload : {
    id : _id,
    avatar,
    email,
    interests,
    username,
    publications,
    listAvatars
  }
})

const setAvatar = (avatar) => ({
  type : 'SET_AVATAR',
  payload : avatar
})

const updateAvatar = (avatar) => ({
  type : 'UPDATE_AVATAR',
  payload : avatar
})

const interestsUpdate = (data) => ({
  type : 'UPDATE_INTERESTS',
  payload : data
})

const addAvatarToListAvatars = ({avatar,avatarId}) => ({
  type : 'ADD_AVATAR_TO_LIST_AVATARS',
  payload : {
    avatar,
    avatarId
  }
})

const removeAvatarToListAvatars = (avatarId) => ({
  type : 'REMOVE_AVATAR_TO_LIST_AVATARS',
  payload : avatarId
})

export const addPublicationToListPublications = (publication) => ({
  type : 'ADD_PUBLICATION_TO_LIST_PUBLICATIONS',
  payload : publication
})

export const removePublicationToListPublications = (idPublication) => ({
  type : 'REMOVE_PUBLICATION_TO_LIST_PUBLICATIONS',
  payload : idPublication
})

export const logout = () => {
  document.cookie = 'id=;path=/'
  document.cookie = 'avatar=;path=/'
  document.cookie = 'email=;path=/'
  document.cookie = 'token=;path=/'
  document.cookie = 'username=;path=/'
  window.location.href = '/'
}
//*******************************************************REQUESTS********************************************************************************

export const getDataUser = ({url,stateRequest}) => dispatch => {
  return new Promise((resolve,reject) => {
    stateRequest(true)
    axios({
      url,
      method : 'GET',
      headers : {
        'Authorization' : `Bearer ${getCookie('token')}`
      }
    })
    .then(({data}) => {
      stateRequest(false)
      dispatch(setInformationUser(data.user))
    })
    .catch(error => {
      stateRequest(false)
      let status = error.request.status 
      let errorMessage
      error.response ? errorMessage = error.response.data.message : errorMessage = error.message
      if(status === 401) redirectByUnauthorized()
      reject(errorMessage)
    })
  })
}

export const uploadAvatar = ({url,stateRequest,data}) => dispatch => {
  return new Promise((resolve,reject) => {
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
      document.cookie = `avatar=${data.avatar};path=/`
      dispatch(setAvatar(data.avatar))
      dispatch(addAvatarToListAvatars({
        avatar : data.avatar,
        avatarId : data.avatarId
      }))
      resolve(true)
    })
    .catch(error => {
      stateRequest(false)
      let status = error.request.status 
      if(status === 401 ) redirectByUnauthorized()
      reject(error.message)
    })
  })
}

export const updateAvatarUser = ({url,stateRequest,avatar}) => dispatch => {
  return new Promise((resolve,reject) => {
    stateRequest(true)
    axios({
      url,
      data : { avatar },
      method : 'PUT',
      headers : {
        'Authorization' : `Bearer ${getCookie('token')}`
      }
    })
    .then(({data}) => {
      stateRequest(false)
      document.cookie =`avatar=${data.avatar};path=/`
      dispatch(updateAvatar(data.avatar))
      resolve(true)
    })
    .catch( error => {
      stateRequest(false)
      let status = error.request.status
      if(status === 401) redirectByUnauthorized()
      reject(false)
    })
  })
}


export const removeAvatar = ({url,avatarId,stateRequest}) => dispatch => {
  stateRequest(true)
  axios({
    url,
    method : 'DELETE',
    data : {
      avatarId
    },
    headers : {
      'Authorization' : `Bearer ${getCookie('token')}`
    }
  })
  .then(({data}) => {
    stateRequest(false)
    dispatch(removeAvatarToListAvatars(data.avatarId))
  })
  .catch( error => {
    stateRequest(false)
    let status = error.request.status
    if(status === 401) redirectByUnauthorized()
  })
}


export const updateInterests = ({url,data,stateRequest}) => dispatch => {
  return new Promise((resolve,reject) => {
    stateRequest(true)
    axios({
      url,
      method : 'PUT',
      data,
      headers : {
        'Authorization' : `Bearer ${getCookie('token')}`
      }
    })
    .then(({data}) => {
      resolve(true)
      stateRequest(false)
      dispatch(interestsUpdate(data.interests))
    })
    .catch( error => {
      reject(error.message)
      let status = error.request.status 
      if(status === 401) redirectByUnauthorized()
    })
  })
}