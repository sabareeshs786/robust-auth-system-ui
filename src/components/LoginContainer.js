import { Link } from 'react-router-dom';
import '../css/loginsignup.css';
import LoginForm from './LoginForm';
import ErrorMsg from "./ErrorMsg";
import LoginContext from '../context/LoginContext';
import { useContext } from 'react';
import InfoMsg from './Info';
import SuccessMsg from './SuccessMsg';

function LoginContainer() {
    const {isLoading} = useContext(LoginContext);
    return (
        <>
            <div className="form-header">
                Login
            </div>
            <InfoMsg context={LoginContext}/>
            <SuccessMsg context={LoginContext} />
            <ErrorMsg context={LoginContext} />

            <LoginForm />

            <div className="separator">
                OR
            </div>
            
            <div className="footer action-button-2">
                <Link
                    className="button"
                    to="/signup"
                    role="button"
                >
                    Signup
                </Link>
            </div>
        </>
    );
};

export default LoginContainer;