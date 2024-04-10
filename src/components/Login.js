import { LoginContextProvider } from '../context/LoginContext';
import LoginContainer from './LoginContainer';

const Login = () => {

    return (
        <LoginContextProvider>
            <LoginContainer />
        </LoginContextProvider>
    );
};

export default Login;