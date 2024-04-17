import React, { useContext } from 'react'
import HomeContext from '../context/HomeContext'
import { Link } from 'react-router-dom';

function HomeContainer() {
    const { handleLogout } = useContext(HomeContext);
  return (
    <>
        <div className="profile-header">
            Profile
        </div>
        <div className="profile-body">
            Profile body
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