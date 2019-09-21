import React,{useState,useEffect} from 'react'
import { connect } from 'react-redux'
import { getPublications }  from '../actions/publicationsActions'
import { useLoading } from '../hooks/useLoading'
import { urlApi } from '../utils/urlApi'
import { Helmet } from 'react-helmet'
import Layout from '../components/Layout'
import SocialContainer from '../components/Social/SocialContainer'
import Publication from '../components/Social/Publication'
import DialogComments from '../components/Social/DialogComments'
import DialogUploadPublication from '../components/Social/DialogUploadPublication'
import Spinner from '../components/Spinner'
import ErrorMessage from '../components/ErrorMessage'

const Social = ({publications,user,errors,getPublications}) => {
  const [dialogComments,setDialogComments] = useState(false)
  const [error,setError] = useState(null)
  const [dialogUploadPublication,setDialogUploadPublication] = useState(false)
  const [loading,setLoading] = useLoading(false)
  const toggleModal = () => setDialogComments(!dialogComments)
  const toggleDialogUploadPublication = () => setDialogUploadPublication(!dialogUploadPublication)

  useEffect(() => {
    if(!publications) {
    getPublications({ 
      url : `${urlApi}/publications?id=${user.id}`,
      stateRequest : setLoading
     })
     .catch(error => setError(error))
    }
  },[])

  const renderPublications = () => {
    if(error) return <ErrorMessage error={error}/>
    if(loading || !publications) return <Spinner/>
    if(!Object.keys(publications).length) return <p>¡Sin publicaciones 😥! Se el primero en publicar algo</p>
    return Object.keys(publications).map( idPublication => (
      <Publication 
        key={idPublication} 
        id={idPublication} 
        showDialogComments={toggleModal}/>
    ))
  }

  return (
      <Layout>
        <Helmet>
        <title>Social Media | PlatziClon</title>
        <meta name='description' content='Compartenos algo interesante | PlatziClon'/>
      </Helmet>
      <SocialContainer showDialogPublication={toggleDialogUploadPublication}>
        {
          renderPublications()
        }
      </SocialContainer>
      { dialogComments && <DialogComments user={user} hideDialog={toggleModal}/> }
      { dialogUploadPublication && <DialogUploadPublication user={user} hideDialog={toggleDialogUploadPublication}/> }
    </Layout>
  )
}

const mapStateToProps = ({publicationsReducer,userReducer}) => ({
  publications : publicationsReducer.publications,
  user : userReducer
})

const mapDispatchToProps = {
  getPublications
}

export default connect(mapStateToProps,mapDispatchToProps)(Social)