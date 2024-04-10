import { FaUser } from 'react-icons/fa';
export default function EmailInput({
    emailRef, userAttribs, validName, user, setEmail, setEmailFocus, forSignup = false
}) {
    return (
        <>
           <div className="input-group">
                    <FaUser />
                    {
                forSignup ?
                    <input
                        type="text"
                        className="input"
                        name="email"
                        ref={emailRef}
                        autoComplete="off"
                        onChange={(e) => setEmail(e.target.value)}
                        value={user}
                        onFocus={() => setEmailFocus(true)}
                        onBlur={() => {setEmailFocus(false)}}
                        placeholder="Email address"
                    /> :
                    <input
                        type="text"
                        className="input"
                        name="email"
                        ref={emailRef}
                        autoComplete="off"
                        {...userAttribs}
                        placeholder="Email address"
                    />
            }
            </div>
        </>
    );
}