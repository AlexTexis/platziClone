import React from 'react'
import { FaHeart } from 'react-icons/fa'
import slugify from 'slugify'
import '../../styles/components/Challenges/Publication.scss'

const Publication = ({title,description,_id}) => (
  <a className='challengePublication_link' target='_blank' href={`/challenges/${slugify(title,'-')}/${_id}`}>
   <article className='challengePublication'>
     <div className='challengeGrid'>
        <div className='challenge__likes'>
            <div className='challenge__likeContainer'>
              <FaHeart size={28}/>
            </div>  
        </div>
        <div className='challenge__content'>
          <h4>{title}</h4>
          <p>{description}</p>
        </div>
     </div>
   </article>
  </a>
)

export default Publication