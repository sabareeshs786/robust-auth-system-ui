import React, { useContext, useEffect } from 'react'
import SubmitButton from "./SubmitButton";
import VerifyMfaCodeContext from '../context/VerifyMfaCodeContext';
import CodeInput from './CodeInput';
import { getField } from '../utils/UtilFunctions';
import DropDownMenu from './DropDownMenu';

function VerifyMfaCodeForm({user, verifyThrough, from, pwd}) {
  const options = {"authApp": "Authenticator App", "email":"Email Address"}
  const { handleSubmit, codeRef, setCode, code, selectedOption, handleSelectChange } = useContext(VerifyMfaCodeContext);
  useEffect(() => {
    codeRef.current.focus();
  }, []);
  return (
    <form onSubmit={(e) => handleSubmit(e, user, from, pwd)} className="form-body">
      {
        verifyThrough === "authApp" && (
          <div>
            <label className="label" htmlFor="dropdown">Authentication method </label>
            <div className="dropdown-container">
              <DropDownMenu options={options} selectedOption={selectedOption} handleSelectChange={(e) => handleSelectChange(e, user)} />
            </div>
          </div>
        )
      }
      <div>
        {verifyThrough !== "authApp" ? `Enter the verification code sent to your ${verifyThrough === "email" ? "Email address" : "Phone number"}` : ''}
        <CodeInput codeRef={codeRef} setCode={setCode} code={code}/>
      </div>
      <div className="footer action-button-1">
        <SubmitButton content="Verify" />
      </div>
    </form>
  )
}

export default VerifyMfaCodeForm