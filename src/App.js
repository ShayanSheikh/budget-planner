import React, { useState, useEffect, useContext } from 'react';
import { GoogleLogout } from 'react-google-login';
import { getSession, logOut } from './session';
import { Box, Container, Grid, Typography, Slider, TextField } from '@material-ui/core';
import SalaryInput from './SalaryInput';
import MoneyDisplay from './MoneyDisplay';
import Login from './Login'
import { AppContext } from './AppProvider';

const CLIENT_ID = '26226890893-7uke9sajq33a0ddg5896nfkvp7phulmd.apps.googleusercontent.com'

const App = () => {
  const [expensePercentage, setExpensePercentage] = useState(1);
  const [salary, setSalary] = useState('');
  const [expenses, setExpenses] = useState('');
  const [savings, setSavings] = useState('');

  const onLogoutSuccess = () => {
    logOut();
  }

  const expenseText = (value) => {
    return `${value}%`;
  }

  useEffect(() => {
    setExpenses(salary / 12 * expensePercentage / 100);
    setSavings(salary / 12 * (1 - expensePercentage / 100));
  }, [salary, expensePercentage]);

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
              <TextField
                label="Enter Salary"
                value={salary}
                onChange={e => setSalary(e.target.value)}
                InputProps={{
                  inputComponent: SalaryInput,
                }}
              />
            </Grid>
            <Grid item xs={6}>
              Your Expenses
            </Grid>
            <Grid item xs={6}>
              <MoneyDisplay value={expenses}/>
            </Grid>
            <Grid item xs={6}>
              Your Savings
            </Grid>
            <Grid item xs={6}>
              <MoneyDisplay value={savings} />
            </Grid>
          </Grid>
        </Container>
    </Container>
    :
    <Login />
  );
}

export default App;
