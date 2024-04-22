import { createContext, useState, useRef } from "react";
import axios from "../api/axios";
import { handleError } from '../utils/ErrorHandler';

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const RESETPASSWORD_URL = '/reset-password';

const ResetPasswordContext = createContext();

export const ResetPasswordContextProvider = ({ children }) => {
    const errRef = useRef();

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);
    const [info, setInfo] = useState('');

    const handleSubmit = async (e, user) => {
        e.preventDefault();
        setInfo('Resetting password...');
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd);
        
        const v = PWD_REGEX.test(pwd);
        if (!v) {
            setErrMsg("Invalid Password entered");
            return;
        }
        try {
            const response = await axios.post(RESETPASSWORD_URL,
                JSON.stringify({ emailPhno: user, pwd, cpwd: matchPwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            setSuccess(true);
            setPwd('');
            setMatchPwd('');
        } catch (err) {
            setInfo('');
            handleError({ err, setErrMsg, errRef });
            errRef.current.focus();
        }
    }
    return (
        <ResetPasswordContext.Provider value={{ errRef, 
            pwd, setPwd, validPwd, setValidPwd, 
            pwdFocus, setPwdFocus, matchPwd, setMatchPwd, validMatch, setValidMatch,
            matchFocus, setMatchFocus, errMsg, setErrMsg, success, setSuccess, info, setInfo,
            handleSubmit}}
        >{children}
        </ResetPasswordContext.Provider>
    )
}

export default ResetPasswordContext;