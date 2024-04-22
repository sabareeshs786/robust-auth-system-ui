import { createContext, useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import { handleError } from "../utils/ErrorHandler";
import { isValidUsername } from "../utils/ValidInput";
const FP_URL = '/forgot-password';

const ForgotPasswordContext = createContext({});

export const ForgotPasswordContextProvider = ({ children }) => {
    const navigate = useNavigate();

    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [info, setInfo] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrMsg('');
        setInfo('Sending verification code...');
        setValidName(isValidUsername(user));
        if(!user){
            setInfo('');
            setErrMsg('Missing email id');
            return;
        }
        if(!isValidUsername(user)){
            setInfo('');
            setErrMsg("Invalid Email id entered");
            return;
        }
        try {
            await axios.post(FP_URL,
                JSON.stringify({ emailPhno: user }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            navigate('/verify-code', {state: {user, forEmail:false}});
        } catch (err) {
            setInfo('');
            handleError({err, setErrMsg, errRef});
        }
    }

    return (
        <ForgotPasswordContext.Provider value={
            {
                userFocus, setUserFocus, validName, setValidName, userRef, errRef, user, setUser, errMsg, setErrMsg, info, setInfo, handleSubmit
            }
        }>
            {children}
        </ForgotPasswordContext.Provider>
    )
}

export default ForgotPasswordContext;