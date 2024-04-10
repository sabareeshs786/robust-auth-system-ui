import { Outlet } from "react-router-dom";

const LayoutAuth = () => {
    return (
        <div className="container">
            <div className="form-container">
                <Outlet />
            </div>
        </div>
    )
}

export default LayoutAuth;
