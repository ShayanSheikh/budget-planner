import React, { useContext } from 'react';
import { GoogleLogin } from 'react-google-login';
import { logIn } from '../session';
import { AppContext } from '../AppProvider';

const CLIENT_ID = '26226890893-7uke9sajq33a0ddg5896nfkvp7phulmd.apps.googleusercontent.com'

const Login = () => {
  const { state, setState } = useContext(AppContext);

  const onLoginFailure = (error) => {
    console.log(error);
  };

  const onLoginSuccess = (response) => {
    logIn(response.accessToken, response.profileObj.givenName);
    setState({ ...state, user: response.profileObj.givenName});
  }

  return (
    <GoogleLogin
      clientId={CLIENT_ID}
      buttonText="Login"
      onSuccess={onLoginSuccess}
      onFailure={onLoginFailure}
      cookiePolicy={'single_host_origin'}
    />
  );
}

export default Login;
