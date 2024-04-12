import { useContext, useState } from "react";
import SignUpContext from "../context/SignUpContext";
import { FaEye, FaEyeSlash, FaKey, FaInfoCircle } from 'react-icons/fa';

export default function ConfirmPassword(){
    const { validMatch, matchPwd, setMatchPwd, setMatchFocus, matchFocus} = useContext(SignUpContext);
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
      };
      const iconStyle = {
        fontSize: '0.8rem', // Specify the size in rem units
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
            </div>
            <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
            <FaInfoCircle style={iconStyle}/>
            Both passwords must match
            </p>
        </>
    )
}