import axios from 'axios'
import { getCookie } from '../utils/getCookieValue'
import { redirectByUnauthorized } from '../utils/redirectByUnauthorized'
import { normalizerData } from '../utils/normalizerData'

const setChallenges = (challenges) => ({
  type : 'SET_CHALLENGES',
  payload : challenges
})

const setChallenge = (challenge) => ({
  type : 'SET_CHALLENGE',
  payload : challenge
})

const setChallengeAdd = (challenge) => ({
  type : 'ADD_CHALLENGE',
  payload : challenge
})

export const getChallenges = ({url,stateRequest}) => dispatch => {
  return new Promise((resolve,reject) => {
    stateRequest(true)
    axios({
      url,
      method : 'GET',
    })
    .then(({data}) => {
      resolve(true)
      stateRequest(false)
      dispatch(setChallenges(normalizerData(data.challenges)))
    })
    .catch( error => {
      stateRequest(false)
      let status = error.request.status 
      let errorMessage
      error.response ? errorMessage = error.response.data.message : errorMessage = error.message
      if(status === 401) return redirectByUnauthorized()
      reject(errorMessage)
    })
  })
}

export const getChallenge = ({url,stateRequest}) => dispatch => {
  return new Promise((resolve,reject) => {
    stateRequest(true)
    axios({
      url,
      method : 'GET',
    })
    .then(({data}) => {
      stateRequest(false)
      dispatch(setChallenge(data.challenge))
    })
    .catch( error => {
      stateRequest(false)
      let status = error.request.status 
      let errorMessage
      error.response ? errorMessage = error.response.data.message : errorMessage = error.message
      if(status === 401) return redirectByUnauthorized()
      reject(errorMessage)
    })
  })
}

export const createChallenge = ({url,stateRequest,data}) => dispatch => {
  const { title,description,content } = data
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
    dispatch(setChallengeAdd({
      [data.idChallenge]: {
        _id : data.idChallenge,
        title,
        description,
        content
      }
    }))
  })
  .catch( error => {
    stateRequest(false)
    let status = error.request.status 
    if(status === 401) redirectByUnauthorized()
  })
}