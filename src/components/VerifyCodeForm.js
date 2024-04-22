import React, { useContext, useEffect } from 'react'
import SubmitButton from "./SubmitButton";
import VerifyCodeContext from '../context/VerifyCodeContext';
import CodeInput from './CodeInput';
import { FaInfoCircle } from 'react-icons/fa';
import { getField } from '../utils/UtilFunctions';

function VerifyCodeForm({user, forEmail}) {
  const { handleSubmit, codeRef, setCode, code } = useContext(VerifyCodeContext);
    useEffect(() => {
      codeRef.current.focus();
    }, []);
  return (
    <form onSubmit={(e) => handleSubmit(e, user, forEmail)} className="form-body">
      <div>
        <p><FaInfoCircle /> Verification code has been sent to the entered {getField(user) === "email" ? "Email address": "Phone number"}. Please enter it to login.</p>
        <CodeInput codeRef={codeRef} setCode={setCode} code={code}/>
      </div>
      <div className="footer action-button-1">
        <SubmitButton content="Verify" />
      </div>
    </form>
  )
}

export default VerifyCodeForm