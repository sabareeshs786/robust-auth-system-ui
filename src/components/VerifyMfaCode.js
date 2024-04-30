import { useLocation } from 'react-router-dom';
import { VerifyMfaCodeContextProvider } from '../context/VerifyMfaCodeContext';
import VerifyMfaCodeContainer from './VerifyMfaCodeContainer';

function VerifyMfaCode() {
  const location = useLocation();
  const user = location?.state?.User;
  const verifyThrough = location?.state?.verifyThrough;
  const from = location?.state?.from;
  const pwd = location?.state?.pwd;

  return (
      <VerifyMfaCodeContextProvider>
        <VerifyMfaCodeContainer user={user} verifyThrough={verifyThrough} from={from} pwd={pwd} />
      </VerifyMfaCodeContextProvider>
  )
}

export default VerifyMfaCode