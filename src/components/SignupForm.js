import { useContext, useEffect } from "react";
import EmailInput from "./EmailInput";
import PasswordInput from "./PasswordInput";
import ConfirmPassword from "./ConfirmPassword";
import SubmitButton from "./SubmitButton";
import SignUpContext from "../context/SignUpContext";
import '../css/loginsignup.css';

export default function SignupForm() {
    const { handleSubmit, setUserFocus, setUser, user, validName, validPwd, pwd, setPwd, setPwdFocus, pwdFocus, userRef } = useContext(SignUpContext);
    useEffect(() =>{
        userRef.current.focus();
    }, []);
    
    return (
        <form onSubmit={handleSubmit} className="form-body">
            <div>
                <EmailInput
                    forSignup={true}
                    setEmailFocus={setUserFocus}
                    userRef={userRef}
                    user={user}
                    validName={validName}
                    setEmail={setUser}
                />
                <PasswordInput 
                    forSignup={true}
                    setPwd={setPwd}
                    pwd={pwd}
                    validPwd={validPwd}
                    setPwdFocus={setPwdFocus}
                    pwdFocus={pwdFocus}
                />
                <ConfirmPassword />
            </div>
            <div className="footer action-button-1">
                <SubmitButton content="Sign up"/>
            </div>
        </form>
    );
}