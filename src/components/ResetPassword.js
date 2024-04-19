import React from 'react';
import { useLocation } from 'react-router-dom';
import { ResetPasswordContextProvider } from '../context/ResetPasswordContext'
import ResetPasswordContainer from './ResetPasswordContainer'

function ResetPassword() {
  const location = useLocation();
  const user = location.state?.user;
  return (
    <ResetPasswordContextProvider>
      <ResetPasswordContainer user={user}/>
    </ResetPasswordContextProvider>
  )
}

export default ResetPassword