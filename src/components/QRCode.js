import React from 'react'
import { useLocation } from 'react-router-dom';
import { QRCodeContextProvider } from '../context/QRCodeContext';
import QRCodeContainer from './QRCodeContainer';

function QRCode() {
    const location = useLocation();
    const qrCodeUrl = location.state?.qrCodeUrl;
    const authMethod = location.state?.authMethod;
    return (
        <QRCodeContextProvider>
            <QRCodeContainer qrCodeUrl={qrCodeUrl} authMethod={authMethod} />
        </QRCodeContextProvider>
    )
}

export default QRCode