import React from 'react'
import '../../styles/components/Social/SocialContainer.scss'

const SocialContainer = ({children,showDialogPublication}) => (
  <section className='social'>
    <div className='social__container'>
      <h2>Social Media</h2>
      <button className='social__btnToPost' onClick={showDialogPublication}>Publicar</button>
      <div>
      {
        children
      }
      </div>
    </div>
  </section>
)

export default SocialContainer