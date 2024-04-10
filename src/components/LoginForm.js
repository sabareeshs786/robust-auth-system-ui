import { useContext, useEffect } from "react";
import EmailInput from "./EmailInput";
import PasswordInput from "./PasswordInput";
import PersistCheckBox from "./PersistCheckBox";
import SubmitButton from "./SubmitButton";
import LoginContext from "../context/LoginContext";
import Help from './Help';

export default function LoginForm() {
    const { handleSubmit, toggleCheck, check, emailRef, userAttribs, pwd, setPwd, user} = useContext(LoginContext);
    useEffect(() => {
        emailRef.current.focus();
    }, []);

    return (
        <form onSubmit={handleSubmit} className="form-body">
            <div>
                <EmailInput 
                    emailRef={emailRef} 
                    userAttribs={userAttribs}
                    user={user}
                />
                <PasswordInput 
                    pwd={pwd} 
                    setPwd={setPwd}
                />
                <PersistCheckBox 
                    toggleCheck={toggleCheck}
                    check={check}
                />
                <Help help="Forget password?" />
            </div>
            <div className="footer action-button-1 login">
                <SubmitButton content="Login" />
            </div>
        </form>
    );
}