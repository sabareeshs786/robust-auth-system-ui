import React, { useContext } from 'react'
import HomeContext from '../context/HomeContext'
import { Link } from 'react-router-dom';

function HomeContainer() {
    const { handleLogout, handleTwoStepVerification } = useContext(HomeContext);
    
  return (
    <>
        <div className="profile-header">
            Profile
        </div>
        <div className="profile-body">
            <div className="input-field">
                Two-step verification: &nbsp; 
                <Link 
                    className="gen-button" 
                    role="button"
                    to={"/enable-mfa-request"}
                >
                    Turn on
                </Link>
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