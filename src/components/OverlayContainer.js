import React from 'react'
import '../styles/components/OverlayContainer.scss'

const OverlayContainer = ({children,onClick,dataSet}) => (
  <div className='overlayContainer' onClick={onClick} data-overlay={dataSet}>
    {
      children
    }
  </div>
)

export default OverlayContainer