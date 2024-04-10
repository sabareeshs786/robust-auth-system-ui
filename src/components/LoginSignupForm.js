import React, { useState } from 'react'
import { FaUser, FaLock} from 'react-icons/fa';
import '../css/loginsignup.css';
import PasswordField from './PasswordField';

export default function () {
    const [page, setPage] = useState("Login");
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [confirmPwd, setConfirmPwd] = useState('');
    const handleButtonClick = () => {
        page === "Login" ? setPage("Signup") : setPage("Login");
    }
    
  return (
    <div className="container">
        <div className="form-container">
            <div className="form-header">
                {page}
            </div>
            <div className="form-body">
                <div className="input-group">
                    <FaUser />
                    <input 
                        type="text"
                        className="input" 
                        name="email" 
                        id="email"
                        autoComplete="off"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        placeholder="Email id"
                    />
                </div>
                <div className="input-group">
                   <PasswordField pwd={pwd} setPwd={setPwd}/>
                </div>
                {
                    page === "Signup" ? (<div className="input-group">
                    <PasswordField pwd={confirmPwd} setPwd={setConfirmPwd} confirmPassword={true}/>
                    </div>) : ''
                }
            </div>
            <div className="footer action-button-1">
                <button className="button">
                    {page}
                </button>
            </div>
            <div className="separator">
                OR
            </div>
            <div className="footer action-button-2">
                <button className="button" onClick={handleButtonClick}>
                    {page === "Login" ? "Signup": "Login"}
                </button>
            </div>
        </div>
    </div>
  )
}