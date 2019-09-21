import React,{useEffect,useRef,useState} from 'react'
import Layout from '../components/Layout'
import Hero from '../components/ChallengeAbout/Hero'
import ChallengeContainer from '../components/ChallengeAbout/ChallengeContainer'
import { connect } from 'react-redux'
import { getChallenge } from '../actions/challengesActions'
import { urlApi } from '../utils/urlApi'
import { useLoading } from '../hooks/useLoading'
import { Helmet } from 'react-helmet'
import Spinner from '../components/Spinner'
import ErrorMessage from '../components/ErrorMessage'

const ChallengeAbout = ({match,challenge,getChallenge}) => {
  const [ loading,setLoading ] = useLoading(false)
  const [error,setError] = useState(null)
  const container = useRef(null)
  const idChallenge = match.params.id
  
  useEffect(() => {
    getChallenge({
      url : `${urlApi}/challenges/${idChallenge}`,
      stateRequest : setLoading
    })
    .catch(error => setError(error))
  },[])
  
  const load = () => {
    if(error) return <ErrorMessage error={error}/>
    if(loading || !Object.keys(challenge).length) return <Spinner/>
    if(container.current) container.current.innerHTML = challenge.content 
  }
  
  return (
    <Layout>
      <Helmet>
        <title>{challenge.title}</title>
        <meta name='description' content={challenge.title}/>
      </Helmet>
      <Hero title={challenge.title ? challenge.title : ''}/>
      <ChallengeContainer>
        { load() }
        <div ref={container}></div>
      </ChallengeContainer>
    </Layout>
  )
}

const mapStateToProps = ({challengesReducer}) => ({
  challenge : challengesReducer.challenge
})

const mapDispatchToProps = {
  getChallenge
}

export default connect(mapStateToProps,mapDispatchToProps)(ChallengeAbout)