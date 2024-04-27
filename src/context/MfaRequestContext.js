import { createContext, useState, useRef } from "react";
import { handleError } from '../utils/ErrorHandler';
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
const MFA_REQ_URL = '/enable-mfa-request';

const MfaRequestContext = createContext();

export const MfaRequestContextProvider = ({ children }) => {
    const navigate = useNavigate();
    const axiosPrivate = useAxiosPrivate();
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
            console.log(selectedOption);
            const response = await axiosPrivate.post(MFA_REQ_URL,
                JSON.stringify({ authMethod: selectedOption }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            const qrCodeUrl = response.data?.qrCodeUrl;
            if(selectedOption === "authApp"){
                navigate('/scan-qr-code', {state: {qrCodeUrl, authMethod: selectedOption}});
            }
            else{
                navigate('/verify-code', {state: {purpose: "eMFA", authMethod: "email"}});
            }
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