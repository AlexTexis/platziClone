import React from 'react'
import '../../styles/components/Challenges/ChallengesContainer.scss'

const ChallengesContainer = ({children}) => {
  return (
    <section className='challenges'>
      <div className="challenges__container">
        <h2>Challenges</h2>
          <div>
            {
              children
            }
          </div>
      </div>
    </section>
  )
}

export default ChallengesContainer