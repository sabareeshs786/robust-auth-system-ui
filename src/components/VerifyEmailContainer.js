import React, { useContext } from 'react'
import VerifyEmailForm from './VerifyEmailForm';
import ErrorMsg from './ErrorMsg';
import VerifyEmailContext from '../context/VerifyEmailContext';

function VerifyEmailContainer({user}) {
  const { handleResendCode } = useContext(VerifyEmailContext);

  return (
    <>
      <div className="form-header">
        Verify Email Address
      </div>
      <ErrorMsg context={VerifyEmailContext} />
      <VerifyEmailForm user={user}/>
      <div className="separator">
        OR
      </div>
      <div className="footer action-button-2">
        <button
            className="button"
            onClick={(e) => handleResendCode(e, user)}
        >
            Resend Code
        </button>
      </div>
    </>
  )
}

export default VerifyEmailContainer