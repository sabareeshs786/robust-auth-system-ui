import { useContext } from "react";
import { Link } from "react-router-dom";
import '../css/loginsignup.css';
import '../css/signup.css';
import SignupForm from "./SignupForm";
import SignUpContext from "../context/SignUpContext";

function SignupContainer() {

    const { success } = useContext(SignUpContext);

    return (
        <>
            {success ? (
                <>
                    <h1>Success!</h1>
                    <p>
                        <Link to="/login">Login</Link>
                    </p>
                </>
            ) : (
                    <>
                        <div className="form-header">
                            Signup
                        </div>
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
            )}
        </>
    );

}

export default SignupContainer;