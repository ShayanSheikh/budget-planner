import React, { useState } from 'react';
import { GoogleLogin } from 'react-google-login';
import './App.css';
import { getSession, logIn } from './session';

const CLIENT_ID = '26226890893-7uke9sajq33a0ddg5896nfkvp7phulmd.apps.googleusercontent.com'
const App = () => {
  const onLoginFailure = () => {
    alert('Problem with loggin in, please try again');
  };

  const onLoginSuccess = (response) => {
    console.log(response);
    logIn(response.accessToken);
  }

  return (
    getSession() ? 
    <div className="App">
      <script src="https://apis.google.com/js/platform.js" async defer></script>
      <meta name="google-signin-client_id" content="26226890893-djsgsov2l5q3heko9182s3ormemdcj0t.apps.googleusercontent.com" />
      <h1>Welcome to the Demo</h1>
      <div className="g-signin2"></div>
    </div>
    :
    <GoogleLogin
      clientId={CLIENT_ID}
      buttonText="Login"
      onSuccess={onLoginSuccess}
      onFailure={onLoginFailure}
      cookiePolicy={'single_host_origin'}
    />
  );
}

export default App;
