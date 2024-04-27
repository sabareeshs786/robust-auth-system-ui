import { useLocation } from 'react-router-dom';
import { VerifyCodeContextProvider } from '../context/VerifyCodeContext';
import VerifyCodeContainer from './VerifyCodeContainer';

function VerifyCode() {
  const location = useLocation();
  const user = location?.state?.user;
  const purpose = location?.state?.purpose;
  const authMethod = location?.state?.authMethod;
  return (
      <VerifyCodeContextProvider>
        <VerifyCodeContainer user={user} purpose={purpose} authMethod={authMethod} />
      </VerifyCodeContextProvider>
  )
}

export default VerifyCode