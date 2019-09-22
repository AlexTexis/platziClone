import React from 'react'
import Layout from '../components/Layout'
import Hero from '../components/Hero'
import SectionBussiness from '../components/Home/HomeBusiness'
import SectionSearch from '../components/Home/HomeSearh'
import SectionCategories from '../components/Home/HomeCategories'
import Prices from '../components/Prices'
import { Helmet } from 'react-helmet'

const Home = () => {
  return ( 
    <Layout>
      <Helmet>
        <title>PlatziClon : Una app inspirada en platzi</title>
        <meta name='description' content='PlatziClon : Una app inspirada en platzi'/>
      </Helmet>
      <Hero/>
      <SectionBussiness/>
      <SectionSearch/>
      <SectionCategories/>
      <Prices/>
    </Layout>
  )
}

export default Home