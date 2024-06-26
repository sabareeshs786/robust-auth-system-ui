import React, { useContext, useEffect } from 'react'
import SubmitButton from "./SubmitButton";
import VerifyCodeContext from '../context/VerifyCodeContext';
import CodeInput from './CodeInput';
import { FaInfoCircle } from 'react-icons/fa';
import { getField } from '../utils/UtilFunctions';

function VerifyCodeForm({user, purpose, authMethod}) {
  const { handleSubmit, codeRef, setCode, code } = useContext(VerifyCodeContext);
    useEffect(() => {
      codeRef.current.focus();
    }, []);
  return (
    <form onSubmit={(e) => handleSubmit(e, user, purpose, authMethod)} className="form-body">
      <div>
        <p><FaInfoCircle /> Verification code has been sent to the Email address. Please enter it.</p>
        <CodeInput codeRef={codeRef} setCode={setCode} code={code}/>
      </div>
      <div className="footer action-button-1">
        <SubmitButton content="Verify" />
      </div>
    </form>
  )
}

export default VerifyCodeForm