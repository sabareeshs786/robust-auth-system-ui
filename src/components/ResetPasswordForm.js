import { useContext, useEffect } from "react";
import PasswordInput from "./PasswordInput";
import SubmitButton from "./SubmitButton";
import ResetPasswordContext from "../context/ResetPasswordContext";
import ConfirmNewPassword from "./ConfirmNewPassword";

export default function ResetPasswordForm({user}) {
    const { handleSubmit, validPwd, pwd, setPwd, setPwdFocus, pwdFocus } = useContext(ResetPasswordContext);
    
    return (
        <form onSubmit={(e) => handleSubmit(e, user)} className="form-body">
            <div>
                <PasswordInput 
                    forRP={true}
                    setPwd={setPwd}
                    pwd={pwd}
                    validPwd={validPwd}
                    setPwdFocus={setPwdFocus}
                    pwdFocus={pwdFocus}
                />
                <ConfirmNewPassword />
            </div>
            <div className="footer action-button-1">
                <SubmitButton content="Reset"/>
            </div>
        </form>
    );
}