import { useContext } from "react";

export default function SuccessMsg({context}){
    const {succRef, succMsg} = useContext(context);
    return (
        <p ref={succRef} className={succMsg ? "succmsg" : "offscreen"} aria-live="assertive">{succMsg}</p>
    );
}