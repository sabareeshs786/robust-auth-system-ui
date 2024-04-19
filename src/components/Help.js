import { Link } from 'react-router-dom';

export default function Help({help}){
    return (
        <div className="help">
            <Link to="/forgot-password">{help}</Link>
        </div>
    );
};