import { SignUpContextProvider } from "../context/SignUpContext";
import SignupContainer from "./SignupContainer";

const Signup = () => {

    return (
        <SignUpContextProvider>
            <SignupContainer />
        </SignUpContextProvider>
    );
}

export default Signup
