import { useContext } from "react";

export default function InfoMsg({context}){
    const {infoRef, info} = useContext(context);
    return (
        <p ref={infoRef} className={info ? "info" : "offscreen"} aria-live="assertive">{info}</p>
    );
}