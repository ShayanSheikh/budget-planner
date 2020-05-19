import React, { useContext } from 'react';
import { GoogleLogin } from 'react-google-login';
import { logIn } from '../session';
import { Box, Container } from '@material-ui/core';
import { AppContext } from '../AppProvider';

const CLIENT_ID = '26226890893-7uke9sajq33a0ddg5896nfkvp7phulmd.apps.googleusercontent.com'

const Login = () => {
  const { state, setState } = useContext(AppContext);

  const onLoginFailure = (error) => {
    alert('There was a problem with logging you in, please try again');
    console.log(error);
  };

  const onLoginSuccess = (response) => {
    logIn(response.accessToken, response.profileObj.givenName);
    setState({ ...state, user: response.profileObj.givenName});
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
