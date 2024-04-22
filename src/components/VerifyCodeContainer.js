import React, { useContext } from 'react'
import VerifyCodeForm from './VerifyCodeForm';
import ErrorMsg from './ErrorMsg';
import VerifyCodeContext from '../context/VerifyCodeContext';
import SuccessMsg from './SuccessMsg';
import { Link } from 'react-router-dom';
import InfoMsg from './Info';

function VerifyCodeContainer({user, forEmail}) {
  const { handleResendCode, isVerified } = useContext(VerifyCodeContext);

  return (
    <>
      {isVerified ?  
          <div className="text-container">
            <div className="green-text"> Verification Successful </div>
            <Link to="/login"> Login </Link> again to continue
          </div>: 
      <>
        <div className="form-header">
          Verify
        </div>
        <InfoMsg context={VerifyCodeContext} />
        <ErrorMsg context={VerifyCodeContext} />
        <SuccessMsg context={VerifyCodeContext} />
        <VerifyCodeForm user={user} forEmail={forEmail}/>
        <div className="separator">
          OR
        </div>
        <div className="footer action-button-2">
          <button
              className="button"
              onClick={(e) => handleResendCode(e, user, forEmail)}
          >
              Resend Code
          </button>
        </div>
      </>
      }
  </>
  )
}

export default VerifyCodeContainer