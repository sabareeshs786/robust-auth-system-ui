import React, { useEffect, useRef, useState } from 'react'
import { handleError } from '../utils/ErrorHandler';
import axios from '../api/axios';
import '../css/logout.css';
import { Link } from 'react-router-dom';
const LOGOUT_URL = '/logout';

function Logout() {
    const [isLogout, setIsLogout] = useState(false);

    const errRef = useRef();
    const [errMsg, setErrMsg] = useState('');
    const logout = async () => {
        try {
            const response = await axios.post(LOGOUT_URL,
                {},
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            setIsLogout(true);
        } catch (error) {
            handleError({error, setErrMsg, errRef});
        }
    };

    useEffect(() => {
        logout();
    }, []);

  return (
        <div className="logout-container">
             { isLogout ?
                <> 
                    <div className="logout-text"> Logged out successfully. </div>
                    Click <Link to="/login"> here </Link> to login again
                </>
                :
                <div className="logout-text"> Logging out...</div>
             }
        </div>
  )
}

export default Logout;