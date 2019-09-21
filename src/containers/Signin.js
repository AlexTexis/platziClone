import React from "react";
import Layout from '../components/Layout'
import FormSignin from '../components/Signin/Form'
import { Helmet } from 'react-helmet'

const Signin = () => (
  <Layout isVisibleNav={false}>
    <Helmet>
      <title>Sign in | PlatziClon</title>
      <meta name='description' content='Inicia sesion | PlatziClon'/>
    </Helmet>
    <FormSignin/>
  </Layout>
)

export default Signin