import React,{useState,Fragment} from 'react'
import MarkdownEditor from '../MarkdownEditor'
import { urlApi } from '../../utils/urlApi'
import { useLoading } from '../../hooks/useLoading'
import { useInputValue } from '../../hooks/useInputValue'
import '../../styles/components/Challenges/RegistrerChallenge.scss'

const RegistrerChallenge = ({createChallenge}) => {
  const [ markdown,setMarkdown ] = useState(false)
  const [loading,setLoading] = useLoading(false)
  const [content,setContent] = useLoading(false)
  const title = useInputValue('')
  const description = useInputValue('')
  const toggleMarkdown = () => setMarkdown(!markdown)
  const handleCreateChallenge = () => createChallenge({
    url : `${urlApi}/challenges`,
    stateRequest : setLoading,
    data : {
      title : title.value,
      description : description.value,
      content
    }
  })

  return (
    <section className='registrerChallenge_container'>
      <button className='registrerChallenge_toggleMarkdown' onClick={toggleMarkdown}>
       {
         markdown ? 'Ocultar' : 'Publicar'
       } 
      </button>
      {
        markdown &&
        <Fragment>
          <input {...title} className='registrerChallenge_boxTitle' type="text" placeholder='Titulo del reto'/>
          <textarea {...description} className='challenge_boxDescription' placeholder='Escribe un breve resumen del reto'></textarea>
          <MarkdownEditor getValue={(value) => setContent(value)}/>
          <button 
            className='registrerChallenge_btnCreate'
            disabled={!title.value || !description.value || !content ? true : false} 
            onClick={handleCreateChallenge}>
            {
              loading ? 
              'Registrando...'
              :
              'Registrar'
            }
          </button>
        </Fragment>
      }
    </section>
  )
}

export default RegistrerChallenge