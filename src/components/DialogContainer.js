import React  from 'react'
import { createPortal } from 'react-dom'

const Portal = ({children}) => createPortal(children,document.getElementById('modals'))

const DialogContainer = ({children}) => (
  <Portal>
    {
      children
    }
  </Portal>
)

export default DialogContainer