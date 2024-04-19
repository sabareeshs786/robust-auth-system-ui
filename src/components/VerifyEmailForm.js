import React, { useContext, useEffect } from 'react'
import SubmitButton from "./SubmitButton";
import VerifyEmailContext from '../context/VerifyEmailContext';
import CodeInput from './CodeInput';

function VerifyEmailForm({user}) {
  const { handleSubmit, codeRef, setCode, code } = useContext(VerifyEmailContext);
    useEffect(() => {
      codeRef.current.focus();
    }, []);
  return (
    <form onSubmit={(e) => handleSubmit(e, user)} className="form-body">
      <div>
        <CodeInput codeRef={codeRef} setCode={setCode} code={code}/>
      </div>
      <div className="footer action-button-1">
        <SubmitButton content="Verify" />
      </div>
    </form>
  )
}

export default VerifyEmailForm