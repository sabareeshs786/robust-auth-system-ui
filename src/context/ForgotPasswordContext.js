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
    const [errMsg, setErrMsg] = useState('');
    const [userFocus, setUserFocus] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setValidName(isValidUsername(user));
        if(!user){
            setErrMsg('Missing email id');
            return;
        }
        if(!isValidUsername(user)){
            setErrMsg("Invalid Email id entered");
            return;
        }
        try {
            const response = await axios.post(FP_URL,
                JSON.stringify({ emailPhno: user }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            navigate('/verify-code', {state: {user, forEmail:false}});
        } catch (err) {
            handleError({err, setErrMsg, errRef});
        }
    }

    return (
        <ForgotPasswordContext.Provider value={
            {
                userFocus, setUserFocus, validName, setValidName, userRef, errRef, user, setUser, errMsg, setErrMsg, handleSubmit
            }
        }>
            {children}
        </ForgotPasswordContext.Provider>
    )
}

export default ForgotPasswordContext;