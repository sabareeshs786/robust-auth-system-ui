import { createContext, useState, useRef } from "react";
import axios from '../api/axios';
import { handleError } from "../utils/ErrorHandler";
import { useNavigate } from "react-router-dom";

const VERIFY_EMAIL_URL = "/verify";
const VERIFY_FP_URL = "/verify-forgot-password-code";
const RESEND = "/resend";
const ENABLE_MFA_URL = "/enable-mfa";
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

    const purposes = ["email", "fp", "eMFA"];
    const purposeMfa = ["eMFA"];
    const authMethods = ["email", "phno"];

    const handleSubmit = async (e, user, purpose, authMethod) => {
        e.preventDefault();
        setSuccMsg('');
        setErrMsg('');
        setInfo('Verifying...');
        if(!user && !purposeMfa.includes(purpose) || purposeMfa.includes(purpose) && !authMethods.includes(authMethod)){
            setInfo('');
            setSuccMsg('');
            setErrMsg('Invalid input data');
            return;
        }
        if(!code || !CODE_REGEX.test(code)){
            setInfo('');
            setSuccMsg('');
            setErrMsg('Invalid code entered\nEnter the correct 6-digit verification code');
            return;
        }
        const URL =  purpose === "email" ? VERIFY_EMAIL_URL : purpose === "fp" ? VERIFY_FP_URL : purpose === "eMFA" ? ENABLE_MFA_URL : '';
        const reqBody = purposeMfa.includes(purpose) ? { authMethod, code } : { emailPhno: user, code };
        try {
            await axios.post(URL,
                JSON.stringify(reqBody),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            if(purpose === "fp"){
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

    const handleResendCode = async (e, user, purpose, authMethod) => {
        setSuccMsg('');
        setErrMsg('');
        setInfo('Resending verification code...');
        if(!user && !purposeMfa.includes(purpose) || purposeMfa.includes(purpose) && !authMethods.includes(authMethod)){
            setInfo('');
            setSuccMsg('');
            setErrMsg('Invalid input data');
            return;
        }
        try {
            await axios.post(RESEND,
                JSON.stringify({ emailPhno: user, purpose: `${purpose === "email" ? "emailPhno": "password"}` }),
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