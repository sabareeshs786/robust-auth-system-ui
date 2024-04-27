import { createContext, useState, useRef } from "react";
import axios from "../api/axios";
import { handleError } from '../utils/ErrorHandler';
import { isValidUsername } from "../utils/ValidInput";
import { useNavigate } from "react-router-dom";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = '/signup';

const SignUpContext = createContext();

export const SignUpContextProvider = ({ children }) => {
    const navigate = useNavigate();

    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [info, setInfo] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrMsg('');
        setInfo('Signing up...');
        setValidName(isValidUsername(user));
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd);
        
        const v1 = isValidUsername(user);
        const v2 = PWD_REGEX.test(pwd);
        if (!v1 || !v2) {
            setInfo('');
            setErrMsg("Invalid Email address or Phone number or password");
            return;
        }
        try {
            const response = await axios.post(REGISTER_URL,
                JSON.stringify({ emailPhno: user, pwd, cpwd: matchPwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            setPwd('');
            setMatchPwd('');
            navigate('/verify-code', {state: {user, purpose: "email"}});
        } catch (err) {
            setInfo('');
            handleError({ err, setErrMsg, errRef });
            errRef.current.focus();
        }
    }
    return (
        <SignUpContext.Provider value={{ userRef, errRef, user, setUser, validName, 
            setValidName, userFocus, setUserFocus, pwd, setPwd, validPwd, setValidPwd, 
            pwdFocus, setPwdFocus, matchPwd, setMatchPwd, validMatch, setValidMatch,
            matchFocus, setMatchFocus, errMsg, setErrMsg, info, setInfo, handleSubmit}}
        >{children}
        </SignUpContext.Provider>
    )
}

export default SignUpContext;