import { useContext, useState } from "react";
import SignUpContext from "../context/SignUpContext";
import { FaEye, FaEyeSlash, FaKey } from 'react-icons/fa';

export default function ConfirmPassword(){
    const { validMatch, matchPwd, setMatchPwd, setMatchFocus, matchFocus} = useContext(SignUpContext);
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
      };

    return (
        <>
            <div className="input-group">
            <FaKey />
            <input
                type={showPassword ? 'text' : 'password'}
                className="input"
                onChange={(e) => setMatchPwd(e.target.value)}
                value={matchPwd}
                onFocus={() => setMatchFocus(true)}
                onBlur={() => setMatchFocus(false)}
                placeholder="Confirm password"
            />
            {showPassword ? (
            <FaEyeSlash onClick={togglePasswordVisibility} 
            size={20}
            className="password-eye"/>
        ) : (
            <FaEye onClick={togglePasswordVisibility}
            size={20} 
            className="password-eye" />
            )}
            <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                Must match the first password input field.
            </p>
            </div>
        </>
    )
}