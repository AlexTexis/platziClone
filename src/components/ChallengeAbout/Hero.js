import React from 'react'
import '../../styles/components/ChallengeAbout/Hero.scss'

const Hero = ({title}) => (
  <section className='challengeAbout_hero' style={{backgroundImage : "url('https://media.licdn.com/dms/image/C561BAQGyjRQujcbnxQ/company-background_10000/0?e=2159024400&v=beta&t=5htZZii9VL_huqvWHaKdltbuy4GO-IYgwZ067eXCCzs')"}}>
    <h3>{title}</h3>
  </section>
)

export default Hero