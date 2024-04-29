import React, { useContext } from 'react'
import SubmitButton from './SubmitButton';
import CodeInput from './CodeInput';
import QRCodeContext from '../context/QRCodeContext';

function QRCodeForm({qrCodeUrl}) {
    const {handleSubmit, code, setCode, codeRef} = useContext(QRCodeContext);
  return (
    <form onSubmit={(e) => handleSubmit(e)} className="form-body">
        <div>
            <label className="label" htmlFor="qrcode">Scan the below QR Code with an Authenticator app </label>
            <div className="qr-container">
                <img src={qrCodeUrl} />
            </div>
        </div>
        <div>
            <p>Please enter the 6-digit code from the Authenticator app</p>
            <CodeInput codeRef={codeRef} setCode={setCode} code={code}/>
        </div>
        <div className="footer action-button-1">
            <SubmitButton content="Continue"/>
        </div>
    </form>
  )
}

export default QRCodeForm