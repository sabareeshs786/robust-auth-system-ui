import { createContext, useRef, useState } from "react";
import useAuth from "../hooks/useAuth";
import axios from '../api/axios';
import { handleError } from "../utils/ErrorHandler";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
const LOGOUT_URL = '/logout';
const DISABLE_MFA_REQUEST = '/disable-mfa-request';

const HomeContext = createContext({});

export const HomeContextProvider = ({ children }) => {
    const { setAuth } = useAuth();
    const navigate = useNavigate();

    const [userInfo, setUserInfo] = useState('');
    const [mfa, setMfa] = useState('');

    const errRef = useRef();
    const [errMsg, setErrMsg] = useState('');
    
    const axiosPrivate = useAxiosPrivate();

    const handleTwoStepVerification = async (e, userInfo) => {
        if(userInfo.mfa) {
            setMfa('Turning off...');
            const response = await axiosPrivate.post(DISABLE_MFA_REQUEST, {}, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            });
            if(response?.data?.message === "Verification code sent successfully"){
                navigate('/verify-code', {state: {purpose: "dMFA", authMethod: response?.data?.codeSentTo}});
            }
        }
        else{
            navigate('/enable-mfa-request');
        }
    }

    const handleLogout = async (e) => {
        setAuth({});
        try {
            const response = await axios.post(LOGOUT_URL,
                {},
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            navigate("/logout");
        } catch (err) {
            handleError({err, setErrMsg, errRef});
        }
    }

    return (
        <HomeContext.Provider value={
            {
                handleLogout, handleTwoStepVerification, userInfo, setUserInfo, mfa, setMfa, errMsg, setErrMsg, errRef
            }
        }>
            {children}
        </HomeContext.Provider>
    )
}

export default HomeContext;