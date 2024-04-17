import { Outlet } from "react-router-dom";
import '../css/profile.css';

const Layout = () => {
    return (
        <div className="container">
            <div className="profile-container">
                <Outlet />
            </div>
        </div>
    )
}

export default Layout;
