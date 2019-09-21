import React,{ useState} from 'react'

export const useLoading = (status=false) => {
  const [ loadindg,setLoading ] = useState(status)

  function handleSetLoading(status) {
    setLoading(status)
  }

  return [ loadindg,handleSetLoading ]
}