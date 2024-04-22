import React from 'react'
import MfaRequestContext from '../context/MfaRequestContext'
import MfaRequestForm from './MfaRequestForm'
import InfoMsg from './Info'
import ErrorMsg from './ErrorMsg'
import { Link } from 'react-router-dom'

function MfaRequestContainer() {
  return (
    <>
        <div className="form-header">
            Multi-factor Authentication
        </div>
        <InfoMsg context={MfaRequestContext} />
        <ErrorMsg context={MfaRequestContext} />
        <MfaRequestForm />

        <div className="separator">
                OR
            </div>
            <div className="footer action-button-2">
                <Link
                    className="button"
                    to="/"
                    role="button"
                >
                    Back to Profile
                </Link>
            </div>
    </>
  )
}

export default MfaRequestContainer