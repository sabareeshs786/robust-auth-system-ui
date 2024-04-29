import React, { useContext, useEffect, useState } from 'react'
import HomeContext from '../context/HomeContext'
import { Link } from 'react-router-dom';
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const USER_URL = "/users/getinfo";

function HomeContainer() {
    const axiosPrivate = useAxiosPrivate();
    const { handleLogout, handleTwoStepVerification, userInfo, setUserInfo, mfa, setMfa } = useContext(HomeContext);
    const getUserInfo = async () => {
        const response = await axiosPrivate.get(USER_URL, {
            withCredentials: true
        });
        setUserInfo(response.data);
        setMfa(`Turn ${response.data?.mfa ? "off": "on"}`);
    }

    useEffect(()=> {
        getUserInfo();
    }, []);
    
  return (
    <>
        <div className="profile-header">
            Profile
        </div>
        <div className="profile-body">
            <div className="input-field">
                Two-step verification: &nbsp; 
                <button 
                    className="gen-button" 
                    onClick={(e) => handleTwoStepVerification(e, userInfo)}
                >
                    {mfa}
                </button>
            </div>
        </div>
        <div className="footer logout">
            <button 
                className="button" 
                onClick={handleLogout}
            >
                Logout
            </button>
        </div>
    </>
  )
}

export default HomeContainer;