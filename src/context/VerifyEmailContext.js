import { createContext, useState, useRef } from "react";
import axios from '../api/axios';
import { handleError } from "../utils/ErrorHandler";
const VERIFY_EMAIL = "/verify";

const VerifyEmailContext = createContext({});

export const VerifyEmailContextProvider = ({ children }) => {
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [code, setCode] = useState('');
    const [isVerified, setIsVerified] = useState(false);
    const [errMsg, setErrMsg] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!user || !code){
            setErrMsg('Missing email id or password');
            return;
        }
        
        try {
            const response = await axios.post(VERIFY_EMAIL,
                JSON.stringify({ emailPhno: user, code }),
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
                errRef, errMsg, setErrMsg, user, setUser, code, setCode, isVerified, setIsVerified, handleSubmit
            }
        }>
            {children}
        </VerifyEmailContext.Provider>
    )
}

export default VerifyEmailContext;