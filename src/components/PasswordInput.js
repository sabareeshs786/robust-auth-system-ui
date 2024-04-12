import React, { useState } from 'react';
import { FaEye, FaEyeSlash, FaLock, FaInfoCircle } from 'react-icons/fa';

function PasswordField({pwd, setPwd, forSignup = false, validPwd, setPwdFocus, pwdFocus}) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const iconStyle = {
    fontSize: '1.4rem', // Specify the size in rem units
  };
  return (
    <>
    <div className="input-group">
      <FaLock />
      {
        forSignup ? <input
        type={showPassword ? 'text' : 'password'}
        className="input"
        name="password"
        id="password"
        autoComplete="off"
        onChange={(e) => setPwd(e.target.value)}
        onFocus={() => setPwdFocus(true)}
        onBlur={() => setPwdFocus(false)}
        value={pwd}
        placeholder={"Password"}
      /> : 
        <input
        type={showPassword ? 'text' : 'password'}
        className="input"
        name="password"
        id="password"
        onChange={(e) => setPwd(e.target.value)}
        value={pwd}
        placeholder={"Password"}
      />
      }
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
    { forSignup &&
        <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
              <FaInfoCircle style={iconStyle}/>
              Password must be 8 to 24 characters long and it must include atleast one uppercase and lowercase letters, a number and a special character.
        </p>
      }
    </>
  );
}

export default PasswordField;