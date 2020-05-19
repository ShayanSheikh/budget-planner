import React, { useContext } from 'react';
import { GoogleLogin } from 'react-google-login';
import { logIn } from '../utils/session';
import { CLIENT_ID } from '../utils/constants';
import { Box, Container } from '@material-ui/core';
import { AppContext } from '../AppProvider';

const Login = () => {
  const { handleSetState } = useContext(AppContext);

  const onLoginFailure = (error) => {
    alert('There was a problem with logging you in, please try again');
    console.log(error);
  };

  const onLoginSuccess = (response) => {
    logIn(response.accessToken, response.profileObj.givenName);
    handleSetState({ user: response.profileObj.givenName });
  }

  return (
    <Container maxWidth="sm">
      <Box display="flex" justifyContent="space-between">
        <h1>Budget Planner</h1>
        <GoogleLogin
          clientId={CLIENT_ID}
          buttonText="Login"
          onSuccess={onLoginSuccess}
          onFailure={onLoginFailure}
          cookiePolicy={'single_host_origin'}
        />
      </Box>
    </Container>
  );
}

export default Login;
