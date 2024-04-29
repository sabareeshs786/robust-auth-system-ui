import { createContext, useState, useRef } from "react";
import axios from '../api/axios';
import { handleError } from "../utils/ErrorHandler";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const VERIFY_EMAIL_URL = "/verify";
const VERIFY_FP_URL = "/verify-forgot-password-code";
const RESEND = "/resend";
const ENABLE_MFA_URL = "/enable-mfa";
const RESEND_EnMFA_CODE_URL = "/resend-enable-mfa-code";
const DISABLE_MFA_URL = "/disable-mfa";
const RESEND_DisMFA_CODE_URL = "/resend-disable-mfa-code";
const CODE_REGEX = /^[0-9]{6}$/;
const VerifyCodeContext = createContext({});

const purposes = ["email", "fp", "eMFA", "dMFA"];
const purposeMfa = ["eMFA", "dMFA"];
const authMethods = ["email", "phno"];

export const VerifyCodeContextProvider = ({ children }) => {
    const axiosPrivate = useAxiosPrivate();

    const navigate = useNavigate();
    const codeRef = useRef();
    const errRef = useRef();
    const succRef = useRef();

    const [code, setCode] = useState('');
    const [isVerified, setIsVerified] = useState(false);
    const [errMsg, setErrMsg] = useState('');
    const [succMsg, setSuccMsg] = useState('');
    const [info, setInfo] = useState('');

    const handleSubmit = async (e, user, purpose, authMethod) => {
        e.preventDefault();
        setSuccMsg('');
        setErrMsg('');
        setInfo('Verifying...');
        if((!user && !purposeMfa.includes(purpose)) 
            || (user && purposeMfa.includes(purpose)) 
            || (purposeMfa.includes(purpose) && !authMethods.includes(authMethod))
            || !purposes.includes(purpose)){
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
        const URL =  purpose === "email" ? VERIFY_EMAIL_URL : purpose === "fp" ? VERIFY_FP_URL : purpose === "eMFA" ? ENABLE_MFA_URL : DISABLE_MFA_URL;
        const reqBody = purposeMfa.includes(purpose) ? { authMethod, code, codeSentTo: authMethod } : { emailPhno: user, code };
        const _axios = purposeMfa.includes(purpose) ? axiosPrivate : axios;
        try {
            const response = await _axios.post(URL,
                JSON.stringify(reqBody),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            if(purpose === "fp"){
                navigate('/reset-password', {state: {user}});
            }
            else if(purpose === "email"){
                setIsVerified(true);
                setErrMsg('');
                setInfo('');
            }
            else if(purposeMfa.includes(purpose)){
                setErrMsg('');
                setInfo('');
                setSuccMsg(`MFA ${purpose === "eMFA" ? "enabled" : "disabled"} successfully. Redirecting...`);
                setTimeout(() => navigate('/'), 2000);
            }
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
        if((!user && !purposeMfa.includes(purpose)) 
        || (user && purposeMfa.includes(purpose)) 
        || (purposeMfa.includes(purpose) && !authMethods.includes(authMethod))
        || !purposes.includes(purpose)){
            setInfo('');
            setSuccMsg('');
            setErrMsg('Invalid input data');
            return;
        }
        const URL = purpose === "eMFA" ? RESEND_EnMFA_CODE_URL : purpose === "dMFA" ? RESEND_DisMFA_CODE_URL : RESEND;
        const reqBody = purposeMfa.includes(purpose) ? { authMethod, codeSentTo: authMethod } : { emailPhno: user, purpose: `${purpose === "email" ? "emailPhno": "password"}` }
        const _axios = purposeMfa.includes(purpose) ? axiosPrivate : axios;
        try {
            await _axios.post(URL,
                JSON.stringify(reqBody),
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