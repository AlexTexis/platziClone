import axios from 'axios'

export const loginUser = ({url,urlRedirect,stateRequest,form}) => dispatch => {
  return new Promise((resolve,reject) => {
    stateRequest(true)
    axios({
      url,
      method : 'POST',
      auth : {
        username : form.email,
        password : form.password
      }
    })
    .then(({data}) => {
      stateRequest(false)
      document.cookie =`token=${data.token};path=/`
      document.cookie =`email=${data.email};path=/`
      document.cookie =`id=${data.id};path=/`
      document.cookie =`username=${data.username};path=/`
      document.cookie =`avatar=${data.avatar ? data.avatar : ''};path=/`
      window.location.href = urlRedirect
    })
    .catch( error => {
      stateRequest(false)
      const status = error.request.status
      let messageError = error.response.data.message
      reject(messageError || error.message)
    })
  })
}

export const registerUser = ({url,urlRedirect,stateRequest,form}) => dispatch => {
  return new Promise((resolve,reject) => {
    stateRequest(true)
    axios({
      url,
      method : 'POST',
      data : form
    })
    .then(({data}) => {
      stateRequest(false)
      document.cookie =`id=${data.id};path=/`
      document.cookie =`email=${data.email};path=/`
      document.cookie =`username=${data.username};path=/`
      document.cookie =`token=${data.token};path=/`
      document.cookie =`avatar=;path=/`
      window.location.href = urlRedirect
    })
    .catch( error => {
      stateRequest(false)
      const status = error.request.status
      let messageError = error.response.data.message
      if(status === 409) return reject('¡Esta cuenta ya existe,intenta con otra!')
      reject(messageError || error.message)
    })
  })
}
