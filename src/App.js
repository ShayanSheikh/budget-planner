import React, { useContext } from 'react';
import { GoogleLogout } from 'react-google-login';
import { getSession, logOut } from './utils/session';
import { Box, Container } from '@material-ui/core';
import { Confirmed, Login, Planner } from './components';
import { AppContext } from './AppProvider';

const CLIENT_ID = '26226890893-7uke9sajq33a0ddg5896nfkvp7phulmd.apps.googleusercontent.com'

const App = () => {
  const { state, setState } = useContext(AppContext);
  const { confirmed } = state;

  const onLogoutSuccess = () => {
    logOut();
    setState({ ...state, user: null })
  };

  return (
    getSession() ?
      <Container maxWidth="sm">
        <Box display="flex" justifyContent="space-between">
          <h1>Budget Planner</h1>
          <GoogleLogout
            clientId={CLIENT_ID}
            buttonText="Logout"
            onLogoutSuccess={onLogoutSuccess}
          />
        </Box>
        { confirmed ?
          <Confirmed />
          :
          <Planner />
        }
      </Container>
    :
    <Login />
  );
}

export default App;
