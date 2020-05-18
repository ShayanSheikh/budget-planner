import React, { useState } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import './App.css';
import { getSession, logIn, logOut } from './session';

const CLIENT_ID = '26226890893-7uke9sajq33a0ddg5896nfkvp7phulmd.apps.googleusercontent.com'

const App = () => {
  const [loggedIn, setLoggedIn] = useState(getSession());

  const onLoginFailure = () => {
    alert('Problem with loggin in, please try again');
  };

  const onLoginSuccess = (response) => {
    logIn(response.accessToken);
    setLoggedIn(true);
  }

  const onLogoutSuccess = () => {
    logOut();
    setLoggedIn(false);
  }

  return (
    loggedIn ? 
    <div className="App">
      <h1>Welcome to the Demo</h1>
        <GoogleLogout
          clientId={CLIENT_ID}
          buttonText="Logout"
          onLogoutSuccess={onLogoutSuccess}
        />
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
