import React,{useEffect,useState} from 'react'
import Checkbox from '../Checkbox'
import Success from '../Success'
import Publications from './SectionPublications'
import ErrorMessage from '../ErrorMessage'
import { useLoading } from '../../hooks/useLoading'
import { urlApi } from '../../utils/urlApi'
import '../../styles/components/Profile/SectionAbout.scss'

const About = ({user,updateInterests}) => { 
  const [interests,setInterests] = useState([])
  const [success,setSuccess] = useState(false)
  const [error,setError] = useState(false)
  const [loading,setLoading] = useLoading(false)
  const handleChecked = e => {
    let name = e.target.dataset.value
    setInterests(interests.map( interest => {
      if(interest.name === name) interest.checked = !interest.checked
      return interest
    }))
  }
  const handleUpdateInterests = () => updateInterests({
    url : `${urlApi}/users/${user.id}/interests`,
    stateRequest : setLoading,
    data : { interests }
  }).then((ok) => {
    setSuccess(true)
    setTimeout(() => setSuccess(false),700)
  })
  .catch(error => setError(error))
  
  useEffect(() => {
    setInterests(user.information.interests)
  },[user.information.interests])

  return (
  <section className="profileAbout">
    <h3>Tus datos</h3>
    <section className="profileAbout__container">
      <div className='profileAbout__item'>
        <label>Usuario</label>
        <input 
          type="text" 
          value={user.username}
          name='nameUser'
          disabled
          />
      </div>
      <div className='profileAbout__item'>
        <label>Email</label>
        <input 
          type="text" 
          name='email'
          disabled
          value={user.email} 
          />
      </div>
    </section>
    <section className='profileAbout__interest'>
          <h3>Temas de interes</h3>
          <div className='profileAbout__interestContainer'>
          {
            interests.map( interest => (
            <label key={interest.name}>
              <Checkbox value={interest.name} isChecked={interest.checked} onChecked={handleChecked}/>
              {interest.name}
            </label>
          ))
          }

          </div>
        </section>
        { success && <Success message='Datos Guardados'/> }
        { error && <ErrorMessage error={error}/> }
        <button className='profile_btnSave' onClick={handleUpdateInterests}>
          {
            loading ? 
            'Actualizando...'
            :
            'Guardar cambios'
          }
        </button>
        <Publications publications={user.information.publications}/>
  </section>
  )
}


export default About