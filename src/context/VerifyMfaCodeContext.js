import { createContext, useState, useRef } from "react";
import axios from '../api/axios';
import { handleError } from "../utils/ErrorHandler";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const VERIFY_URL = "/verify-mfa";
const SEND_URL = "/send-mfa-code";
const RESEND_URL = "/resend-mfa-code"
const CODE_REGEX = /^[0-9]{6}$/;

const VerifyMfaCodeContext = createContext({});

export const VerifyMfaCodeContextProvider = ({ children }) => {
    const { setAuth } = useAuth();
    const navigate = useNavigate();
    const codeRef = useRef();
    const errRef = useRef();
    const succRef = useRef();

    const [selectedOption, setSelectedOption] = useState("authApp");
    const [code, setCode] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [succMsg, setSuccMsg] = useState('');
    const [info, setInfo] = useState('');

    const handleSendMfaCode = async (user) => {
        try {
            setSuccMsg('');
            setErrMsg('');
            setInfo('Sending verification code...');
            if(!user){
                setInfo('');
                setSuccMsg('');
                setErrMsg('Invalid input data');
                return;
            }
            const response = await axios.post(SEND_URL,
                JSON.stringify({emailPhno: user}),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            setErrMsg('');
            setInfo('');
            setSuccMsg('Verification code sent successfully');
            succRef?.current?.focus();
        } catch (err) {
            setSuccMsg('');
            setInfo('');
            handleError({err, setErrMsg, errRef});
        }
    }
    const handleSelectChange = (event, user) => {
        setSelectedOption(event.target.value);
        if(event.target.value === "email"){
            handleSendMfaCode(user);
        }
    };

    const handleSubmit = async (e, user, from, pwd) => {
        e.preventDefault();
        setSuccMsg('');
        setErrMsg('');
        setInfo('Verifying...');
        if(!user || !selectedOption){
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
        try {
            const response = await axios.post(VERIFY_URL,
                JSON.stringify({emailPhno: user, code, authMethod: selectedOption}),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
            setAuth({ user, pwd, roles, accessToken });
            setErrMsg('');
            setInfo('');
            setSuccMsg(`Verification successful. Redirecting...`);
            setTimeout(() => navigate(from, {replace: true}), 2000);
        } catch (err) {
            setSuccMsg('');
            setInfo('');
            handleError({err, setErrMsg, errRef});
        }
    }

    const handleResendCode = async (e, user) => {
        setSuccMsg('');
        setErrMsg('');
        setInfo('Resending verification code...');
        if(!user){
            setInfo('');
            setSuccMsg('');
            setErrMsg('Invalid input data');
            return;
        }
        try {
            await axios.post(RESEND_URL,
                JSON.stringify({emailPhno: user}),
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
        <VerifyMfaCodeContext.Provider value={
            {
                codeRef, errRef, errMsg, setErrMsg, succRef, succMsg, setSuccMsg, code, setCode, handleSubmit, handleResendCode,
                info, setInfo, selectedOption, setSelectedOption, handleSelectChange
            }
        }>
            {children}
        </VerifyMfaCodeContext.Provider>
    )
}

export default VerifyMfaCodeContext;