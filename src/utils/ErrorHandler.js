const handleError = ({err, setErrMsg, errRef}) => {
    if (!err?.response) {
        setErrMsg('No Server Response');
    } else if (err.response.data.message) {
        setErrMsg(err.response.data.message);
    } else {
        setErrMsg(err.response.data);
    }
    errRef?.current?.focus();
}

export {handleError};