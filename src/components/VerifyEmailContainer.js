import React, { useContext } from 'react'
import VerifyEmailForm from './VerifyEmailForm';
import ErrorMsg from './ErrorMsg';
import VerifyEmailContext from '../context/VerifyEmailContext';
import SuccessMsg from './SuccessMsg';
import { Link } from 'react-router-dom';

function VerifyEmailContainer({user}) {
  const { handleResendCode, isVerified } = useContext(VerifyEmailContext);

  return (
    <>
      {isVerified ?  
          <div className="text-container">
            <div className="green-text"> Verification Successful </div>
            <Link to="/login"> Login </Link> again to continue
          </div>: 
      <>
        <div className="form-header">
          Verify Email Address
        </div>
        <ErrorMsg context={VerifyEmailContext} />
        <SuccessMsg context={VerifyEmailContext} />
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
      }
  </>
  )
}

export default VerifyEmailContainer