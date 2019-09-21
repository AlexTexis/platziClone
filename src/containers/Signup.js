import React from "react";
import Layout from '../components/Layout'
import FormSignup from '../components/Signup/Form'
import { Helmet } from 'react-helmet'

const Signup = () => (
  <Layout isVisibleNav={false}>
    <Helmet>
      <title>Sign up | PlatziClon</title>
      <meta name='description' content='Create una cuenta para disfutar | PlatziClon'/>
    </Helmet>
    <FormSignup/>
  </Layout>
)

export default Signup