import { createContext, useState, useRef } from "react";
import axios from '../api/axios';
import { handleError } from "../utils/ErrorHandler";
import { useNavigate } from "react-router-dom";

const VERIFY_EMAIL = "/verify";
const RESEND = "/resend";
const CODE_REGEX = /^[0-9]{6}$/;
const VerifyEmailContext = createContext({});

export const VerifyEmailContextProvider = ({ children }) => {
    const navigate = useNavigate();
    const codeRef = useRef();
    const errRef = useRef();
    const succRef = useRef();

    const [code, setCode] = useState('');
    const [isVerified, setIsVerified] = useState(false);
    const [errMsg, setErrMsg] = useState('');
    const [succMsg, setSuccMsg] = useState('');

    const handleSubmit = async (e, user) => {
        e.preventDefault();
        if(!user || !code){
            setErrMsg('Missing email address or verification code');
            return;
        }
        if(!CODE_REGEX.test(code)){
            setErrMsg('Invalid code entered\nEnter the correct 6-digit verification code');
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
            setIsVerified(true);
            setErrMsg('');
        } catch (err) {
            setSuccMsg('');
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
            setErrMsg('');
            setSuccMsg('Verification code resent successfully');
            succRef?.current?.focus();
        } catch (err) {
            setSuccMsg('');
            handleError({err, setErrMsg, errRef});
        }
    }

    return (
        <VerifyEmailContext.Provider value={
            {
                codeRef, errRef, errMsg, setErrMsg, succRef, succMsg, setSuccMsg, code, setCode, isVerified, setIsVerified, handleSubmit, handleResendCode
            }
        }>
            {children}
        </VerifyEmailContext.Provider>
    )
}

export default VerifyEmailContext;