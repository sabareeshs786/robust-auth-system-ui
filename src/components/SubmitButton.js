export default function SubmitButton({content, className = "button"}){
    return (
        <button
            type="submit"
            className={className}
        >{content}</button>
    );
}