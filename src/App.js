import React, { useContext } from 'react';
import { GoogleLogout } from 'react-google-login';
import { getSession, logOut } from './utils/session';
import { CLIENT_ID, INITIAL_STATE } from './utils/constants';
import { Box, Container } from '@material-ui/core';
import { Confirmed, Login, Planner } from './components';
import { AppContext } from './AppProvider';

const App = () => {
  const { state, handleSetState } = useContext(AppContext);
  const { confirmed } = state;

  const onLogoutSuccess = () => {
    logOut();
    handleSetState(INITIAL_STATE);
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
