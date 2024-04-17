import { createContext, useRef, useState } from "react";
import useAuth from "../hooks/useAuth";
import axios from '../api/axios';
import { handleError } from "../utils/ErrorHandler";
import { useNavigate } from "react-router-dom";
const LOGOUT_URL = '/logout';

const HomeContext = createContext({});

export const HomeContextProvider = ({ children }) => {
    const { setAuth } = useAuth();
    const navigate = useNavigate();
    const errRef = useRef();
    const [errMsg, setErrMsg] = useState('');
    
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
                handleLogout, errMsg, setErrMsg, errRef
            }
        }>
            {children}
        </HomeContext.Provider>
    )
}

export default HomeContext;