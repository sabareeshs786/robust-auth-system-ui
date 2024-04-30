import React, { useContext, useEffect } from 'react'
import VerifyMfaCodeForm from './VerifyMfaCodeForm';
import ErrorMsg from './ErrorMsg';
import VerifyMfaCodeContext from '../context/VerifyMfaCodeContext';
import SuccessMsg from './SuccessMsg';
import InfoMsg from './Info';

function VerifyMfaCodeContainer({user, verifyThrough, from, pwd}) {
  const { handleResendCode, setSelectedOption } = useContext(VerifyMfaCodeContext);
  useEffect(() => {
    setSelectedOption(verifyThrough);
  }, []);
  return (
    <>
      <div className="form-header">
        Verify your identity
      </div>
      <InfoMsg context={VerifyMfaCodeContext} />
      <ErrorMsg context={VerifyMfaCodeContext} />
      <SuccessMsg context={VerifyMfaCodeContext} />
      <VerifyMfaCodeForm user={user} verifyThrough={verifyThrough} from={from} pwd={pwd} />
      {
        verifyThrough !== "authApp" && (
        <>
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
      
    </>
  )
}

export default VerifyMfaCodeContainer