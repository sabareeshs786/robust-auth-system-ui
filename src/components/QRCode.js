import React from 'react'
import { useLocation } from 'react-router-dom';
import { QRCodeContextProvider } from '../context/QRCodeContext';
import QRCodeContainer from './QRCodeContainer';

function QRCode() {
    const location = useLocation();
    const qrCodeUrl = location.state?.qrCodeUrl;
    return (
        <QRCodeContextProvider>
            <QRCodeContainer qrCodeUrl={qrCodeUrl} />
        </QRCodeContextProvider>
    )
}

export default QRCode