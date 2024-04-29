import React from 'react'
import InfoMsg from './Info'
import ErrorMsg from './ErrorMsg'
import { Link } from 'react-router-dom'
import QRCodeForm from './QRCodeForm'
import QRCodeContext from '../context/QRCodeContext'
import SuccessMsg from './SuccessMsg';

function QRCodeContainer({qrCodeUrl}) {
  return (
    <>
        <div className="form-header">
            Multi-factor Authentication
        </div>
        <InfoMsg context={QRCodeContext} />
        <ErrorMsg context={QRCodeContext} />
        <SuccessMsg context={QRCodeContext} />
        
        <QRCodeForm qrCodeUrl={qrCodeUrl} />

        <div className="separator">
            OR
        </div>
        <div className="footer action-button-2">
            <Link
                className="button"
                to="/"
                role="button"
            >
                Back to Profile
            </Link>
        </div>
    </>
  )
}

export default QRCodeContainer