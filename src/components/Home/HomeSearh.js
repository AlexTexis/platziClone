import React from 'react'
import '../../styles/components/Home/SectionSearch.scss'

const HomeSearch = () => (
  <section className='homeSearch'>
    <div className='homeSearch_container'>
      <h2>¿En qué quieres especializarte?</h2>
      <input type="text" placeholder='Busca entre los mas de 300 cursos'/>
    </div>
  </section>
)

export default HomeSearch