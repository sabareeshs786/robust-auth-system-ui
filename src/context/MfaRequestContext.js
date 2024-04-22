import { createContext, useState, useRef } from "react";
import axios from "../api/axios";
import { handleError } from '../utils/ErrorHandler';
import { useNavigate } from "react-router-dom";

const MFA_REQ_URL = '/signup';

const MfaRequestContext = createContext();

export const MfaRequestContextProvider = ({ children }) => {
    const navigate = useNavigate();
    const [selectedOption, setSelectedOption] = useState("authApp");

    const errRef = useRef();

    const [errMsg, setErrMsg] = useState('');
    const [info, setInfo] = useState('');

    const handleSelectChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrMsg('');
        setInfo('Sending request...');
        
        try {
            const response = await axios.post(MFA_REQ_URL,
                JSON.stringify({ mode: selectedOption }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            navigate('/enable-mfa');
        } catch (err) {
            setInfo('');
            handleError({ err, setErrMsg, errRef });
            errRef.current.focus();
        }
    }
    return (
        <MfaRequestContext.Provider value={{ selectedOption, setSelectedOption, errRef,  errMsg, setErrMsg, info, setInfo, handleSelectChange, handleSubmit}}
        >{children}
        </MfaRequestContext.Provider>
    )
}

export default MfaRequestContext;