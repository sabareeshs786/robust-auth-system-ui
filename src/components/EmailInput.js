import { FaUser } from 'react-icons/fa';
export default function EmailInput({
    userRef, userAttribs, validName, user, setEmail, setEmailFocus, forSignup = false
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
                        ref={userRef}
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
                        ref={userRef}
                        autoComplete="off"
                        {...userAttribs}
                        placeholder="Email address"
                    />
            }
            </div>
        </>
    );
}