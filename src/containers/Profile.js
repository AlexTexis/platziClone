import React,{ useState,useEffect } from 'react'
import { connect } from 'react-redux'
import { urlApi } from '../utils/urlApi'
import { getDataUser,updateInterests } from '../actions/userActions'
import { useLoading } from '../hooks/useLoading'
import { Helmet } from 'react-helmet'
import Layout from '../components/Layout' 
import ProfileContainer from '../components/Profile/ProfileContainer'
import Avatar from '../components/Profile/SectionAvatar'
import About from '../components/Profile/SectionAbout'
import DialogUploadAvatar from '../components/Profile/DialogUploadAvatar'
import DialogSelectPhoto from '../components/Profile/DialogSelectPhoto'
import Spinner from '../components/Spinner'
import ErrorMessage from '../components/ErrorMessage'

const Profile = ({user,getDataUser,updateInterests}) => {
  const [ dialogUploadAvatar,setDialogUploadAvatar ] = useState(false)
  const [ dialogSelecPhoto,setDialogSelectPhoto ] = useState(false)
  const [error,setError] = useState(null)
  const [loading,setLoading] = useLoading(false)
  const toggleDialogUploadAvatar = () => setDialogUploadAvatar(!dialogUploadAvatar)
  const toggleDialogSelectPhoto = () => setDialogSelectPhoto(!dialogSelecPhoto) 
  
  useEffect(() => {
    if(!Object.keys(user.information).length) getDataUser({
      url : `${urlApi}/users/${user.id}`,
      stateRequest : setLoading
     })
     .catch(error => setError(error))
  },[])

  const renderAbout = () => {
    if(error) return <ErrorMessage error={error}/>
    if(loading || !Object.keys(user.information).length ) return <Spinner/>
    return <About user={user} updateInterests={updateInterests}/>
  }

  return (
  <Layout isVisivleFooter={false}>
    <Helmet>
      <title>Mi perfil</title>
      <meta name='description' content='Mi perfil'/>
    </Helmet>
    <ProfileContainer> 
      <Avatar user={user} showDialogSelectPhoto={toggleDialogSelectPhoto} showDialogUploadAvatar={toggleDialogUploadAvatar}/>
      { renderAbout() }
    </ProfileContainer>
   { dialogUploadAvatar && <DialogUploadAvatar hideDialog={toggleDialogUploadAvatar}/> }
   { dialogSelecPhoto && <DialogSelectPhoto user={user} hideDialog={setDialogSelectPhoto}/> }
  </Layout>
)
}

const mapStateToProps = ({userReducer}) => ({
  user : userReducer
})

const mapDispatchToProps = {
  getDataUser,
  updateInterests
}

export default connect(mapStateToProps,mapDispatchToProps)(Profile)