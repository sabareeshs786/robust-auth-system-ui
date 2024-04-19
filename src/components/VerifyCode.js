import { useLocation } from 'react-router-dom';
import { VerifyCodeContextProvider } from '../context/VerifyCodeContext';
import VerifyCodeContainer from './VerifyCodeContainer';

function VerifyCode() {
  const location = useLocation();
  const user = location.state?.user;
  const forEmail = !!location.state?.forEmail;
  return (
      <VerifyCodeContextProvider>
        <VerifyCodeContainer user={user} forEmail={forEmail}/>
      </VerifyCodeContextProvider>
  )
}

export default VerifyCode