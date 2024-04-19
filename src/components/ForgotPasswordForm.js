import { useContext, useEffect } from "react";
import EmailInput from "./EmailInput";
import SubmitButton from "./SubmitButton";
import ForgotPasswordContext from "../context/ForgotPasswordContext";

export default function ForgotPasswordForm() {
    const { handleSubmit, setUserFocus, setUser, user, validName, userRef } = useContext(ForgotPasswordContext);
    useEffect(() =>{
        userRef.current.focus();
    }, []);
    
    return (
        <form onSubmit={handleSubmit} className="form-body">
            <div>
                <EmailInput
                    forFP={true}
                    setEmailFocus={setUserFocus}
                    userRef={userRef}
                    user={user}
                    validName={validName}
                    setEmail={setUser}
                />
            </div>
            <div className="footer action-button-1">
                <SubmitButton content="Get Verification Code"/>
            </div>
        </form>
    );
}