import './App.css';
import LayoutAuth from './components/LayoutAuth';
import Login from './components/Login';
import Signup from './components/Signup';
import PersistLogin from './components/PersistLogin';
import RequireAuth from './components/RequireAuth';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Layout from './components/Layout';
import Logout from './components/Logout';
import VerifyEmail from './components/VerifyEmail';

const ROLES = {
  "Admin": 51507865,
  "Editor": 1984078,
  "User": 2001345
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route element={<PersistLogin />}>
            <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
              <Route path="" element={<Home />} />
            </Route>
          </Route>
      </Route>

      {/* Authentication and Authorization routes */}
      <Route path="/" element={<LayoutAuth />}>
        <Route path="login" element={<Login />}/>
        <Route path="signup" element={<Signup />}/>
        <Route path="logout" element={<Logout />} />
        <Route path="verify-email" element={<VerifyEmail />}/>
      </Route>
    </Routes>
  );
}

export default App;