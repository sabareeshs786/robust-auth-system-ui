import { createContext, useState, useRef } from "react";
import axios from '../api/axios';
import { handleError } from "../utils/ErrorHandler";
import { useNavigate } from "react-router-dom";

const VERIFY_EMAIL_URL = "/verify";
const VERIFY_FP_URL = "/verify-forgot-password-code"
const RESEND = "/resend";
const CODE_REGEX = /^[0-9]{6}$/;
const VerifyCodeContext = createContext({});

export const VerifyCodeContextProvider = ({ children }) => {
    const navigate = useNavigate();
    const codeRef = useRef();
    const errRef = useRef();
    const succRef = useRef();

    const [code, setCode] = useState('');
    const [isVerified, setIsVerified] = useState(false);
    const [errMsg, setErrMsg] = useState('');
    const [succMsg, setSuccMsg] = useState('');
    const [info, setInfo] = useState('');

    const handleSubmit = async (e, user, forEmail) => {
        e.preventDefault();
        setInfo('Verifying...');
        if(!user || !code){
            setErrMsg('Missing email address or verification code');
            return;
        }
        if(!CODE_REGEX.test(code)){
            setErrMsg('Invalid code entered\nEnter the correct 6-digit verification code');
            return;
        }
        const URL = forEmail ? VERIFY_EMAIL_URL : VERIFY_FP_URL;
        try {
            await axios.post(URL,
                JSON.stringify({ emailPhno: user, code }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            if(!forEmail){
                navigate('/reset-password', {state: {user}});
            }
            else{
                setIsVerified(true);
            }
            setErrMsg('');
            setInfo('');
        } catch (err) {
            setSuccMsg('');
            setInfo('');
            handleError({err, setErrMsg, errRef});
        }
    }

    const handleResendCode = async (e, user, forEmail) => {
        setInfo('Resending verification code...');
        if(!user){
            setErrMsg('Missing Email Address');
            return;
        }
        try {
            await axios.post(RESEND,
                JSON.stringify({ emailPhno: user, purpose: `${forEmail ? "emailPhno": "password"}` }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            setErrMsg('');
            setInfo('');
            setSuccMsg('Verification code resent successfully');
            succRef?.current?.focus();
        } catch (err) {
            setSuccMsg('');
            setInfo('');
            handleError({err, setErrMsg, errRef});
        }
    }

    return (
        <VerifyCodeContext.Provider value={
            {
                codeRef, errRef, errMsg, setErrMsg, succRef, succMsg, setSuccMsg, code, setCode, isVerified, setIsVerified, handleSubmit, handleResendCode,
                info, setInfo
            }
        }>
            {children}
        </VerifyCodeContext.Provider>
    )
}

export default VerifyCodeContext;