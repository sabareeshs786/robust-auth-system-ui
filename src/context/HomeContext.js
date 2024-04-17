import { createContext, useState, useRef } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import useInput from '../hooks/useInput';
import useToggle from '../hooks/useToggle';
import useAuth from "../hooks/useAuth";
import axios from '../api/axios';
import { handleError } from "../utils/ErrorHandler";
const LOGOUT_URL = '/logout';

const HomeContext = createContext({});

export const HomeContextProvider = ({ children }) => {
    const { setAuth } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const userRef = useRef();
    const errRef = useRef();

    const [user, resetUser, userAttribs] = useInput('email', '');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [check, toggleCheck] = useToggle('persist', false);

    const handleLogout = async (e) => {
        
        try {
            const response = await axios.post(LOGOUT_URL,
                {},
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
        <HomeContext.Provider value={
            {
                navigate, location, from, userRef, errRef, user, resetUser, userAttribs, pwd, setPwd, errMsg, setErrMsg, check, toggleCheck, handleLogout
            }
        }>
            {children}
        </HomeContext.Provider>
    )
}

export default HomeContext;