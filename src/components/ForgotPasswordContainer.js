import React from 'react'
import ForgotPasswordForm from './ForgotPasswordForm'
import ForgotPasswordContext from '../context/ForgotPasswordContext'
import ErrorMsg from './ErrorMsg'
import { Link } from 'react-router-dom'

function ForgotPasswordContainer() {
  return (
    <>
        <div className="form-header">
                Forgot Password
            </div>
        <ErrorMsg context={ForgotPasswordContext} />
        <ForgotPasswordForm />

        <div className="separator">
            OR
        </div>
            
        <div className="footer action-button-2">
            <Link
                className="button"
                to="/login"
                role="button"
            >
                Back to Login
            </Link>
        </div>
    </>
  )
}

export default ForgotPasswordContainer