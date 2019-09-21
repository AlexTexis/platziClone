import React from 'react'
import '../styles/components/Checkbox.scss'

const Checkbox = ({value,isChecked,onChecked}) => (
  <input 
    className='checkbox__component' 
    checked={isChecked} 
    type='checkbox' 
    onChange={onChecked}
    data-value={value} />
)

export default Checkbox