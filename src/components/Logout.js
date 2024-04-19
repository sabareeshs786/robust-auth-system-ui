import '../css/logout.css';
import { Link } from 'react-router-dom';

function Logout() {

  return (
        <div className="text-container">
            <div className="green-text"> Logged out successfully. </div>
            Click <Link to="/login"> here </Link> to login again
        </div>
  )
}

export default Logout;