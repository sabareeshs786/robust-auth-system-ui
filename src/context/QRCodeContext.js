import { createContext, useState, useRef } from "react";
import { handleError } from '../utils/ErrorHandler';
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
const ENABLE_MFA_URL = '/enable-mfa';

const QRCodeContext = createContext();

export const QRCodeContextProvider = ({ children }) => {
    const navigate = useNavigate();
    const axiosPrivate = useAxiosPrivate();

    const codeRef = useRef();
    const infoRef = useRef();
    const errRef = useRef();
    const succRef = useRef();

    const [succMsg, setSuccMsg] = useState('');
    const [code, setCode] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [info, setInfo] = useState('');

    const handleSubmit = async (e, authMethod) => {
        e.preventDefault();
        setErrMsg('');
        setInfo('Sending request...');
        
        try {
            const response = await axiosPrivate.post(ENABLE_MFA_URL,
                JSON.stringify({ authMethod, code }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            setInfo('');
            setErrMsg('');
            setSuccMsg('MFA enabled successfully');
        } catch (err) {
            setInfo('');
            setSuccMsg('');
            handleError({ err, setErrMsg, errRef });
            errRef.current.focus();
        }
    }
    return (
        <QRCodeContext.Provider value={{ code, setCode, codeRef, succMsg, setSuccMsg, infoRef, succRef, errRef,  errMsg, setErrMsg, info, setInfo, handleSubmit}}
        >{children}
        </QRCodeContext.Provider>
    )
}

export default QRCodeContext;