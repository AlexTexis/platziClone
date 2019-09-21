import React from 'react'
import '../../styles/components/ChallengeAbout/ChallengeContainer.scss'

const ChallengeContainer = ({children}) => (
  <section className='challengeAbout_container'>
    <div>
      {
        children
      }
    </div>
  </section>
)

export default ChallengeContainer