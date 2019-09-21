import React from 'react'
import '../styles/components/Hero.scss'
 
const Hero  = () => {
  return (
    <section className='hero'>
      <div className="hero_container">
        <div className="hero_description">
          <h1>La escuela online de formación profesional en tecnología</h1>
          <div className='hero_statsContainer'>
            <span>
              70%
            </span>
            <p>de los graduados de Platzi duplican sus ingresos</p>
          </div>
          <div className='hero_statsContainer'>
            <span>
              20%
            </span>
            <p>crean su propia empresa de tecnología o startup</p>
          </div>
          <button className='hero_btn'>Registrate en un nuevo curso</button>
          <button className='hero_btn'>Toma tu primera clase</button>
        </div>
        <div className="hero_floatImg"></div>
        <div className='hero_floatBottomImg'>
          <img src='https://res.cloudinary.com/dhf6era2g/image/upload/v1568650143/assets/icon-bottom_g04qcl.png' alt=""/>
        </div>
      </div>
    </section>
  )
}

export default Hero