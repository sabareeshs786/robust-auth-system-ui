import { Link } from "react-router-dom";
import '../css/loginsignup.css';
import '../css/signup.css';
import SignupForm from "./SignupForm";
import SignUpContext from "../context/SignUpContext";
import ErrorMsg from "./ErrorMsg";
import InfoMsg from "./Info";


function SignupContainer() {

    return (
        <>
            <div className="form-header">
                Signup
            </div>
            <InfoMsg context={SignUpContext} />
            <ErrorMsg context={SignUpContext} />
            <SignupForm />

            <div className="separator">
                OR
            </div>
            <div className="footer action-button-2">
                <Link
                    className="button"
                    to="/login"
                    role="button"
                >
                    Login
                </Link>
            </div>
        </>
    );

}

export default SignupContainer;