import React,{useRef,useState,useEffect} from 'react'
import 'intersection-observer'//polyfill

export const useNearScreen = () => {
  const [show,setShow] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
      const observer = new IntersectionObserver((entries) => {
        let { isIntersecting } = entries[0]
        if(isIntersecting) {
          setShow(true)
          observer.disconnect()
        }
      })
      observer.observe(ref.current)
  },[ref])

  return [show,ref]
}