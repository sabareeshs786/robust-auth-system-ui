import React from 'react'
import { MfaRequestContextProvider } from '../context/MfaRequestContext'
import MfaRequestContainer from './MfaRequestContainer'

function MfaRequest() {
  return (
    <MfaRequestContextProvider>
        <MfaRequestContainer />
    </MfaRequestContextProvider>
  )
}

export default MfaRequest