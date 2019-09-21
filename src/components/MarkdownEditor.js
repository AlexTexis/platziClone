import React,{ useRef,useState,useEffect} from 'react'
import MarkdownIt from 'markdown-it'
import '../styles/components/MarkdowEditor.scss'

const MarkdownEditor = ({getValue}) => {
  const md = new MarkdownIt({
    breaks : true,
    linkify : true
  })
  const prevView = useRef(null)
  const [htmlStr,setHtmlStr] = useState('')
  const onChange = (e) => {
   let value = e.target.value
   let result = md.render(value)
   setHtmlStr(result)
   prevView.current.innerHTML = result
  }

  useEffect(() => {
    getValue(htmlStr)
  },[htmlStr])

  return (
    <section>
      <div className='markdownEditor_container'>
        <div className='markdownEditor_header'>
          <p>Markdown</p>
          <p>Vista Previa</p>
        </div>
        <div className='markdownEditor_gridContainer'>
          <div className='markdownEditor_boxWrite'>
            <textarea 
              onChange={onChange}
              >
            </textarea>
          </div>
          <div ref={prevView} className='markdownEditor_resultMd'>
            {/* result parser */}
          </div>
        </div>
      </div>
    </section>
  )
}

export default MarkdownEditor