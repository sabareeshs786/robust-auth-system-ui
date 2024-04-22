import { useContext } from "react";
import { Link } from "react-router-dom";
import ErrorMsg from "./ErrorMsg";
import ResetPasswordContext from "../context/ResetPasswordContext";
import ResetPasswordForm from "./ResetPasswordForm";
import InfoMsg from "./Info";

function ResetPasswordContainer({user}) {

    const { success } = useContext(ResetPasswordContext);

    return (
        <>
            {success ? (
                <div className="text-container">
                <div className="green-text"> Password Changed Successfully! </div>
                <Link to="/login"> Login </Link> again to continue
              </div>
            ) : (
                    <>
                        <div className="form-header">
                            Reset Password
                        </div>
                        <ErrorMsg context={ResetPasswordContext} />
                        <InfoMsg context={ResetPasswordContext} />
                        <ResetPasswordForm user={user}/>
                    </>
            )}
        </>
    );

}

export default ResetPasswordContainer;