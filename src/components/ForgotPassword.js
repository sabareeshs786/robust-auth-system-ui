import React from 'react'
import { ForgotPasswordContextProvider } from '../context/ForgotPasswordContext'
import ForgotPasswordContainer from './ForgotPasswordContainer'

function ForgotPassword() {
  return (
    <ForgotPasswordContextProvider>
        <ForgotPasswordContainer />
    </ForgotPasswordContextProvider>
  )
}

export default ForgotPassword