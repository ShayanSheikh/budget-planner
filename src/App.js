import React, { useState, useEffect, useContext } from 'react';
import { GoogleLogout } from 'react-google-login';
import { getSession, logOut, setUserInfo } from './session';
import { Box, Button, Container, Grid, Typography, Slider, TextField } from '@material-ui/core';
import SalaryInput from './SalaryInput';
import MoneyDisplay from './MoneyDisplay';
import Login from './Login'
import { AppContext } from './AppProvider';

const CLIENT_ID = '26226890893-7uke9sajq33a0ddg5896nfkvp7phulmd.apps.googleusercontent.com'

const App = () => {
  const { state, setState } = useContext(AppContext);
  const { user, elections } = state;

  const [expensePercentage, setExpensePercentage] = useState(elections.expensePercentage);
  const [salary, setSalary] = useState(elections.salary);
  const [expenses, setExpenses] = useState('');
  const [savings, setSavings] = useState('');

  const onLogoutSuccess = () => {
    logOut();
    setState({ ...state, user: null })
  }

  useEffect(() => {
    setExpenses(salary / 12 * expensePercentage / 100);
    setSavings(salary / 12 * (1 - expensePercentage / 100));
  }, [salary, expensePercentage]);

  const handleSubmit = () => {
    const userInfo = {
      elections: { salary, expensePercentage },
      confirmed: true
    }
    setState({ ...state, ...userInfo });
    setUserInfo(userInfo);
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
      <h2>{`Welcome ${user}`}</h2>
      <Container>
        <Typography id="discrete-slider" gutterBottom>
          Expenses
        </Typography>
        <Slider
          value={expensePercentage}
          onChange={(e, val) => setExpensePercentage(val)}
          step={0.1}
          min={1}
          max={30}
          valueLabelDisplay="auto"
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
            <Grid item xs={6} />
            <Grid item xs={6}>
              <Button onClick={handleSubmit}>Submit</Button>
            </Grid>
        </Grid>
      </Container>
    </Container>
    :
    <Login />
  );
}

export default App;
