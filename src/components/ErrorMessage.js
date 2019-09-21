import React from 'react'
import '../styles/components/ErrorMessge.scss'

const ErrorMessage = ({error}) => <span className='errorMessage'>{error}</span>

export default ErrorMessage