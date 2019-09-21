import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { registerUser } from '../../actions/authActions'
import { useLoading } from '../../hooks/useLoading'
import { useInputValue } from '../../hooks/useInputValue'
import { urlApi } from '../../utils/urlApi'
import ErrorMessage from '../ErrorMessage'
import '../../styles/components/FormAuth.scss'

const FormSignup = ({registerUser}) => {
  const [ loading,setLoading ] = useLoading(false)
  const [ errorMatchPassword,setErrorMatchPassword ] = useLoading(false)
  const [error,setError] = useState(null)
  const email = useInputValue('')
  const userName = useInputValue('')
  const password = useInputValue('')
  const confirmPassword = useInputValue('')

  const handleRegistrerUser = e => {
    e.preventDefault()
    if(password.value !== confirmPassword.value) return setErrorMatchPassword(true)
    registerUser({
      url : `${urlApi}/auth/signup`,
      stateRequest : setLoading,
      form : {
        username : userName.value,
        email : email.value,
        password : password.value
      },
      urlRedirect : '/'
    })
    .catch( error => setError(error))
  }

  const renderError = () => error && <ErrorMessage error={error}/>
  const renderErrorMatchPassword = () => errorMatchPassword && <ErrorMessage error='No hace match tu password'/>
  
  
  return (
    <div className="formAuth">
      <div className="formAuth_container">
        <form onSubmit={handleRegistrerUser} className='signin__form' autoComplete='off'>
          <div className="formAuth_inputContainer">
            <input type="text" required {...userName} />
            <label>Nombre de usuario</label>
          </div>
          <div className="formAuth_inputContainer">
            <input type="text" required  {...email}/>
            <label>Correo electronico</label>
          </div>
          <div className="formAuth_inputContainer">
            <input type="password" required {...password}/>
            <label>Contraseña</label>
          </div>
          <div className="formAuth_inputContainer">
            <input type="password" required {...confirmPassword}/>
            <label>Confirma tu contraseña</label>
          </div>
          { renderErrorMatchPassword() }
          { renderError() }
          <button 
            disabled={email.value && userName.value && password.value ? false : true}
            type='submit' 
            className='formAuth_btn'>
            {
              loading ? 
              'Registrando...'
              :
             ' Crear mi cuenta'
            }
          </button>
        </form>
      </div>
      <div className='formAuth_accounFooter'>
        <p>¿Ya tienes una cuenta?</p>
        <Link to='/signin' className='formAuth_linkForm'>Inicia sesion</Link>
      </div>
    </div>
  )
}

const mapDispatchToProps = {
  registerUser
}

export default connect(null,mapDispatchToProps)(FormSignup)