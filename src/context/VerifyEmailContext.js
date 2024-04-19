import { createContext, useState, useRef } from "react";
import axios from '../api/axios';
import { handleError } from "../utils/ErrorHandler";
import { useNavigate } from "react-router-dom";

const VERIFY_EMAIL = "/verify";
const RESEND = "/resend";

const VerifyEmailContext = createContext({});

export const VerifyEmailContextProvider = ({ children }) => {
    const navigate = useNavigate();
    const codeRef = useRef();
    const errRef = useRef();

    const [code, setCode] = useState('');
    const [isVerified, setIsVerified] = useState(false);
    const [errMsg, setErrMsg] = useState('');

    const handleSubmit = async (e, user) => {
        e.preventDefault();
        if(!user || !code){
            setErrMsg('Missing email address or verification code');
            return;
        }
        
        try {
            await axios.post(VERIFY_EMAIL,
                JSON.stringify({ emailPhno: user, code }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            navigate('/');
        } catch (err) {
            handleError({err, setErrMsg, errRef});
        }
    }

    const handleResendCode = async (e, user) => {
        if(!user){
            setErrMsg('Missing Email Address');
            return;
        }
        try {
            await axios.post(RESEND,
                JSON.stringify({ emailPhno: user, purpose: "emailPhno" }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
        } catch (err) {
            handleError({err, setErrMsg, errRef});
        }
    }

    return (
        <VerifyEmailContext.Provider value={
            {
                codeRef, errRef, errMsg, setErrMsg, code, setCode, isVerified, setIsVerified, handleSubmit, handleResendCode
            }
        }>
            {children}
        </VerifyEmailContext.Provider>
    )
}

export default VerifyEmailContext;