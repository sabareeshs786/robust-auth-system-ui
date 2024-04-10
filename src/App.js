import './App.css';
import LayoutAuth from './components/LayoutAuth';
import Login from './components/Login';
import Signup from './components/Signup';
import PersistLogin from './components/PersistLogin';
import RequireAuth from './components/RequireAuth';
import { Routes, Route } from 'react-router-dom';

const ROLES = {
  "Admin": 51507865,
  "Editor": 1984078,
  "User": 2001345
}

function App() {
  return (
    <Routes>
      <Route path="/" >
        <Route element={<PersistLogin />}>
            <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
              <Route path="" element={<>Home page</>} />
            </Route>
          </Route>
      </Route>

      {/* Authentication and Authorization routes */}
      <Route path="/" element={<LayoutAuth />}>
        <Route path="login" element={<Login />}/>
        <Route path="signup" element={<Signup />}/>
      </Route>
    </Routes>
  );
}

export default App;