import React, { useState, useEffect } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { getSession, logIn, logOut } from './session';
import { Box, Container, Grid, Typography, Slider, Input } from '@material-ui/core';

const CLIENT_ID = '26226890893-7uke9sajq33a0ddg5896nfkvp7phulmd.apps.googleusercontent.com'

const App = () => {
  const [loggedIn, setLoggedIn] = useState(getSession());
  const [expensePercentage, setExpensePercentage] = useState(1);
  const [salary, setSalary] = useState('');
  const [expenses, setExpenses] = useState('');
  const [savings, setSavings] = useState('');

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

  const expenseText = (value) => {
    return `${value}%`;
  }

  useEffect(() => {
    setExpenses(salary / 12 * expensePercentage / 100);
    setSavings(salary / 12 * (1 - expensePercentage / 100));
  }, [salary, expensePercentage]);

  return (
    loggedIn ? 
    <Container maxWidth="sm">
      <Box display="flex" justifyContent="space-between">
        <h1>Budget Planner</h1>
        <GoogleLogout
          clientId={CLIENT_ID}
          buttonText="Logout"
          onLogoutSuccess={onLogoutSuccess}
        />
      </Box>
        <Container>
          <Typography id="discrete-slider" gutterBottom>
            Expenses
          </Typography>
          <Slider
            value={expensePercentage}
            getAriaValueText={expenseText}
            onChange={(e, val) => setExpensePercentage(val)}
            step={0.1}
            min={1}
            max={30}
            valueLabelDisplay="on"
          />
          <Grid container spacing={3}>
            <Grid item xs={6}>
              Your Salary
            </Grid>
            <Grid item xs={6}>
              <Input
                placeholder='Enter Salary'
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                style={{textAlign: "center"}}
              />
            </Grid>
            <Grid item xs={6}>
              Your Expenses
            </Grid>
            <Grid item xs={6}>
              {expenses}
            </Grid>
            <Grid item xs={6}>
              Your Savings
            </Grid>
            <Grid item xs={6}>
              {savings}
            </Grid>
          </Grid>
        </Container>
    </Container>
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
