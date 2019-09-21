import React from 'react'
import '../../styles/components/Home/SectionCategories.scss'

const HomeCategories = () => (
  <section className='homeCategories'>
    <div className="homeCategories_container">
      <article className='homeCategories_item'>
        <div className="homeCategories_itemIcon homeCategories-code">
        </div>
        <div className='homeCategories_itemTitle'>
          <h3>Desarrollo e ingenieria</h3>
        </div>
      </article>
      <article className='homeCategories_item'>
        <div className="homeCategories_itemIcon homeCategories-increase">
        </div>
        <div className='homeCategories_itemTitle'>
          <h3>Crecimiento Profesional</h3>
        </div>
      </article>
      <article className='homeCategories_item'>
        <div className="homeCategories_itemIcon homeCategories-business">
        </div>
        <div className='homeCategories_itemTitle'>
          <h3>Crecimiento Profesional</h3>
        </div>
      </article>
      <article className='homeCategories_item'>
        <div className="homeCategories_itemIcon homeCategories-visual">
        </div>
        <div className='homeCategories_itemTitle'>
          <h3>Produccion audiovisual</h3>
        </div>
      </article>
      <article className='homeCategories_item'>
        <div className="homeCategories_itemIcon homeCategories-marketing">
        </div>
        <div className='homeCategories_itemTitle'>
          <h3>Produccion audiovisual</h3>
        </div>
      </article>
    </div>
  </section>
)

export default HomeCategories