import React, { useContext, useEffect } from 'react'
import SubmitButton from "./SubmitButton";
import VerifyCodeContext from '../context/VerifyCodeContext';
import CodeInput from './CodeInput';

function VerifyCodeForm({user, forEmail}) {
  const { handleSubmit, codeRef, setCode, code } = useContext(VerifyCodeContext);
    useEffect(() => {
      codeRef.current.focus();
    }, []);
  return (
    <form onSubmit={(e) => handleSubmit(e, user, forEmail)} className="form-body">
      <div>
        <CodeInput codeRef={codeRef} setCode={setCode} code={code}/>
      </div>
      <div className="footer action-button-1">
        <SubmitButton content="Verify" />
      </div>
    </form>
  )
}

export default VerifyCodeForm