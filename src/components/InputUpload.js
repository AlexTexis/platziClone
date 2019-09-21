import React,{ useState,useRef,useEffect } from 'react'
import '../styles/components/InputUpload.scss'

const InputUpload = ({getFileValue,titleLabel}) => {
  const inputFile = useRef(null)
  const [fileTitle,setFileTitle] = useState(null)
  const [file,setFile] = useState(null)
  const openFileExplore = () => inputFile.current.click()
  const loadFile = e => { 
    setFileTitle(e.target.value.match(/[\/\\]([\w\d\s\.\-\(\)]+)$/)[1]) 
    setFile(inputFile.current.files[0])
  }
  const handleFileValue = () => new Promise((resolve,reject) => {
    if(!file) return reject(null)
    resolve(file)
  })
  //enviar el file cada vez carge un archivo
  useEffect(() => {
    handleFileValue()
    .then( file => getFileValue(file))
    .catch( empty => getFileValue(empty))
  },[file])


  return (
    <div className='inputUploadContainer'>
      <input 
        ref={inputFile}
        onChange={loadFile}
        hidden
        className='inputUpload_file' 
        type="file"/>
      <button className='inputUpload_btn' onClick={openFileExplore}>Buscar</button>
      <span className='inputUpload_titleFile'>
        {
          fileTitle ?
          fileTitle
          :
          titleLabel
        }
      </span>
    </div>
  )
}

export default InputUpload