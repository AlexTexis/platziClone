import React,{useState} from 'react'
import '../../styles/components/FormAuth.scss'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { loginUser } from '../../actions/authActions'
import { urlApi } from '../../utils/urlApi'
import { useLoading } from '../../hooks/useLoading'
import { useInputValue } from '../../hooks/useInputValue'
import ErrorMessage from '../ErrorMessage'

const FormSignin = ({loginUser}) => {
  const [loading,setLoading] = useLoading(false)
  const [error,setError] = useState(null)
  const email = useInputValue('')
  const password = useInputValue('')

  const onSubmit = e => {
    e.preventDefault()
    loginUser({
      url : `${urlApi}/auth/signin`,
      urlRedirect : '/',
      stateRequest : setLoading,
      form : { 
        email : email.value,
        password : password.value
      }
    })
    .catch(error => setError(error)) 
  }

  const renderError = () => error && <ErrorMessage error={error}/>

  return (
    <div className="formAuth">
      <div className="formAuth_container">
        <div className="formAuth_socialsContainer">
          <a><img src='https://res.cloudinary.com/dhf6era2g/image/upload/v1568650133/assets/google-icon_hlesff.png' alt="google"/> Inicia sesion con google</a>
          <a><img src='https://res.cloudinary.com/dhf6era2g/image/upload/v1568650172/assets/twitter-icon_scowg9.png' alt="twitter"/> Inicia sesion con twitter</a>
        </div>
        <div className="formAuth_split">
          <hr/>
          <span>o</span>
        </div>
        <form onSubmit={onSubmit} className='signin__form' autoComplete='off'>
          <div className="formAuth_inputContainer">
            <input type="text" {...email} required />
            <label>Tu email</label>
          </div>
          <div className="formAuth_inputContainer">
            <input type="password" {...password} required/>
            <label>Tu password</label>
          </div>
          { renderError() }
          <button 
            type='submit' 
            className='formAuth_btn'
            disabled={email.value && password.value ? false : true}
            >
            {
              loading ?
              'iniciando...'
              :
              'Iniciar sesion'
            }
          </button>
        </form>
      </div>
      <div className='formAuth_accounFooter'>
        <p>¿Aún no tienes cuenta en Platzi?</p>
        <Link className='formAuth_linkForm' to='signup'>Registrate</Link>
      </div>
    </div>
  )
}
const mapDispatchToProps = {
  loginUser
}

export default connect(null,mapDispatchToProps)(FormSignin)