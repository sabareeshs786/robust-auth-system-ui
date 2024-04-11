const handleError = ({err, setErrMsg, errRef}) => {
    if (!err?.response) {
        setErrMsg('No Server Response');
    } else if (err.response?.status === 400) {
        setErrMsg('Missing Username or Password');
    } else if (err.response?.status === 401) {
        setErrMsg('Invalid Email id or Password');
    } else {
        setErrMsg('Login Failed');
    }
    errRef.current.focus();
}

export {handleError};