import React from 'react'
import { FaTwitter,FaYoutube,FaFacebook,FaInstagram } from 'react-icons/fa'
import '../styles/components/Footer.scss'

const Footer = ({isVisivleFooter=true}) => isVisivleFooter && (
  <footer>
    <div className="footer_container">
      <div className='footer_sloganSection'>
        <div>
          <figure>
            <img 
              width='150'
              src='https://static.platzi.com/static/images/footer/logo.a76b2a87162b.png' 
              alt='logo'/>
          </figure>
          <p>
          Transformamos la economía de nuestros países entrenando a la próxima generación de profesionales en tecnología.
          </p>
        </div>
        <div className='footer_socialsContainer'>
          <p>Aprende en nuestras redes:</p>
          <div>
            <a href='https://twitter.com/platzi' target='_blank'>
              <FaTwitter className='footer_iconSocial' size={24}/>
            </a>
            <a href='https://www.youtube.com/user/mejorandolaweb' target='_blank'>
             <FaYoutube className='footer_iconSocial' size={24}/>
            </a>
            <a href='https://www.facebook.com/platzi' target='_blank'>
             <FaFacebook className='footer_iconSocial' size={24}/>
            </a>
            <a href='https://www.instagram.com/platzi/' target='_blank'>
              <FaInstagram className='footer_iconSocial' size={24}/>
            </a>
          </div>
        </div>
      </div>
      <div className='footer_categoriesSection'>
        <a href="#">Desarrollo e ingenieria</a>
        <a href="#">Diseño y UX</a>
        <a href="#">Marketing</a>
        <a href="#">Negocios y emprendimiento</a>
        <a href="#">Comunidad</a>
        <a href="#">Produccion audiovisual</a>
        <a href="#">Crecimiento Profesional</a>
      </div>
      <div className='footer_certifiersSection'>
        <div className='footer_certifiersContainer'>
          <p>Certificadores oficiales en tecnologías</p>
          <figure>
            <img
              width='80'
              src='https://static.platzi.com/static/images/footer/logo-ibm.a5ea724e8e90.png' 
              alt=''/>
          </figure>
          <figure>
            <img
              width='80'
              src='https://static.platzi.com/static/images/footer/logo-unity.5a9d7d021565.png' 
              alt=''/>
          </figure>
        </div>
      </div>
    </div>
  </footer>
)

export default Footer
