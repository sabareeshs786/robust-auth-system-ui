import React, { useState } from 'react';
import { FaEye, FaEyeSlash, FaLock, FaKey } from 'react-icons/fa';

function PasswordField({pwd, setPwd, confirmPassword=false}) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      {confirmPassword ? <FaKey /> : <FaLock />}
      <input
        type={showPassword ? 'text' : 'password'}
        className="input"
        name="password"
        id="password"
        autoComplete="off"
        onChange={(e) => setPwd(e.target.value)}
        value={pwd}
        placeholder={confirmPassword ? "Confirm Password": "Password"}
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
    </>
  );
}

export default PasswordField;