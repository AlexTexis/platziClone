import React,{useEffect,useState} from 'react'
import Layout from '../components/Layout'
import Hero from '../components/Challenges/Hero'
import ChallengesContainer from '../components/Challenges/ChallengesContainer'
import Publication from '../components/Challenges/Publication'
import RegistrerChallenge from '../components/Challenges/RegistrerChallenge'
import Spinner from '../components/Spinner'
import ErrorMessage from '../components/ErrorMessage'
import { connect } from 'react-redux'
import { getChallenges,createChallenge } from '../actions/challengesActions'
import { useLoading } from '../hooks/useLoading'
import { urlApi } from '../utils/urlApi'
import { Helmet } from 'react-helmet'

const Challenges = ({user,challenges,getChallenges,createChallenge}) => {
  const [loading,setLoading] = useLoading(false)
  const [error,setError] = useState(null)
  
  useEffect(() => {
   if(!Object.keys(challenges).length) getChallenges({
     url : `${urlApi}/challenges`,
     stateRequest : setLoading
   })
   .catch( error => setError(error))
  },[])

  const render = () => {
    if(error) return <ErrorMessage error={error}/>
    if(loading || !Object.keys(challenges)) return <Spinner/>
    if(!Object.keys(challenges).length > 0) return <p>¡No hay publicaciones!</p>
    return Object.keys(challenges).map( id => <Publication key={id} {...challenges[id]}/>)
  }

  return (
    <Layout>
      <Helmet>
        <title>Retos de PlatziClon</title>
        <meta name='description' content='Retos de Platzi-Pon a prueba tus habilidades'/>
      </Helmet>
      <Hero/>
      { user.id && <RegistrerChallenge createChallenge={createChallenge}/> }
      <ChallengesContainer>
        { render() }
     </ChallengesContainer>
    </Layout>
  )
}

const mapStateToProps = ({userReducer,challengesReducer}) => ({
  user : userReducer,
  challenges : challengesReducer.challenges
})

const mapDispatchToProps = {
  getChallenges,
  createChallenge
}

export default connect(mapStateToProps,mapDispatchToProps)(Challenges)