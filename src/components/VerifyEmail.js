import { useLocation } from 'react-router-dom';
import { VerifyEmailContextProvider } from '../context/VerifyEmailContext';
import VerifyEmailContainer from './VerifyEmailContainer';

function VerifyEmail() {
  const location = useLocation();
  const user = location.state?.user;
  return (
      <VerifyEmailContextProvider>
        <VerifyEmailContainer user={user}/>
      </VerifyEmailContextProvider>
  )
}

export default VerifyEmail