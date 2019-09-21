import React,{useEffect} from 'react'
import '../styles/components/NotFound.scss'

const NotFound = () => { 
  useEffect(() => {
    document.querySelector('body').style.backgroundColor = '#15210A'
  },[])

  return (
  <section className='notFound'>
    <div className='notFound_container'>
        <img src='https://res.cloudinary.com/dhf6era2g/image/upload/v1568650148/assets/img404.a1003ad86732_o0yup7.png' alt=""/>
        <h2>Hmmm!</h2>
        <p>No encontramos lo que buscabas</p>
    </div>
  </section>
)
}

export default NotFound