import React,{useState,useEffect} from 'react'
import { FaCheck,FaTimes } from 'react-icons/fa'
import '../styles/components/Prices.scss'

const PriceItem = ({name,price,features,className}) => (
<div className={`priceItem ${className}`}>
  <div className='priceItem_head'>
    <h3>{name}</h3>
    <div>
      <p className='priceItem_quantity'>
        <span>${price}</span> 
        pesos
      </p>
      <span className='priceItem_description'>En un solo pago de</span>
    </div>
  </div>
  <div className='priceItem_features'>
    {
      features.map( (feature,index) => feature ?
        ( <span key={index}><FaCheck className='price_featureCheck' size={18}/></span> ) 
        : 
        ( <span key={index}><FaTimes className='price_featureUncheck' size={18}/></span> )
      )
    }
  </div>
 </div>  
)

const Tab = ({selectTab}) => {
  const handleSelectTab = e => {
    let buttonList = document.getElementsByClassName('tab_btnPlain')
    for(let i=0; i < buttonList.length;i++) {
      if(buttonList[i].classList.contains('actived')) buttonList[i].classList.remove('actived')
    }
    e.target.classList.add('actived')
    selectTab(e.target.dataset.id)
  }

  return (
  <div className='prices_tabNavigation'>
    <button className='tab_btnPlain actived' onClick={handleSelectTab} data-id={1}>Platzi Expert</button>
    <button className='tab_btnPlain' onClick={handleSelectTab} data-id={2}>Platzi Basic</button>
    <button className='tab_btnPlain' onClick={handleSelectTab} data-id={3}>Un solo curso</button>
  </div>
)
}

const Prices = () => {
  const [selected,setSelected] = useState(1) // by default
  const plains = {
    1 : {
     name : 'Platzi Expert',
     price : '500' ,
     features : [true,true,true,true,true,true,true,true,true,true] 
    },
    2 : {
     name : 'Platzi Basic',
     price : '769',
     features : [true,false,true,true,true,false,true,false,false,false]  
    },
    3 : {
     name : 'Un solo curso',
     price : '879',
     features : [false,false,false,true,true,false,true,true,false,false]   
    }
  }
  const selectTab = (value) => {
   setSelected(value)
  }
 
  return (
    <section className='prices_section'>
      <h2>Elige un plan y empieza a estudiar</h2>
      <Tab selectTab={selectTab}/>
      <div className='prices_container'>
        <div className='prices_details'>
          <div className='price_head'>
          <h3>Que obtienes</h3>
          </div>
          <div className='price_detailsFeature'>
            <p>Accedes a más de 300 cursos y 50 carreras</p>
            <p>9 cursos exclusivos</p>
            <p>Clases en vivo o a tu ritmo con profesores y mentores</p>
            <p>Estudia donde quieras en la web o en tu teléfono</p>
            <p>Certificados digitales de los cursos que apruebas</p>
            <p>Recibe los certificados de tus carreras, vivas donde vivas</p>
            <p>Acceso a las actualizaciones de todos los cursos</p>
            <p>Entrada exclusiva al Taller de Creación de Startups</p>
            <p>Entrada preferencial a PlatziConf en todo el mundo</p>
            <p>Descarga los cursos offline con la app de iOS o Android</p>
          </div>
        </div>
        <div className='prices_itemsContainer'>
          {
            Object.keys(plains).map( idPlain => ( <PriceItem key={idPlain} {...plains[idPlain]}/> ) )
          }
          <PriceItem className='selected' {...plains[selected]}/>
        </div>
      </div>
    </section>
  )
}

export default Prices