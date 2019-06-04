import React from 'react';
import PageTemplate from '../components/common/PageTemplate';
import LoginContainer from '../containers/user/LoginContainer'

const LoginPage = () => {
  return (
    <PageTemplate>
        <LoginContainer/>
    </PageTemplate>
  );
};

export default LoginPage;