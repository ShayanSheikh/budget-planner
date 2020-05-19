import React, { useState, useEffect, useContext } from 'react';
import { GoogleLogout } from 'react-google-login';
import { logOut, setUserInfo } from '../session';
import { Box, Button, Container, Grid } from '@material-ui/core';
import { MoneyDisplay } from '.';
import { AppContext } from '../AppProvider';

const CLIENT_ID = '26226890893-7uke9sajq33a0ddg5896nfkvp7phulmd.apps.googleusercontent.com'

const Planner = () => {
  const { state, setState } = useContext(AppContext);
  const { user, elections } = state;

  const [expensePercentage] = useState(elections.expensePercentage);
  const [salary] = useState(elections.salary);
  const [expenses, setExpenses] = useState('');
  const [savings, setSavings] = useState('');

  const onLogoutSuccess = () => {
    logOut();
    setState({ ...state, user: null })
  };

  useEffect(() => {
    setExpenses(salary / 12 * expensePercentage / 100);
    setSavings(salary / 12 * (1 - expensePercentage / 100));
  }, [salary, expensePercentage]);

  const handleEdit = () => {
    setState({ ...state, confirmed: false });
    setUserInfo({ confirmed: false });
  };

  return (
    <Container maxWidth="sm">
      <Box display="flex" justifyContent="space-between">
        <h1>Budget Planner</h1>
        <GoogleLogout
          clientId={CLIENT_ID}
          buttonText="Logout"
          onLogoutSuccess={onLogoutSuccess}
        />
      </Box>
      <h2>{`Thank You ${user}`}</h2>
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            Your Election
          </Grid>
          <Grid item xs={6}>
            <MoneyDisplay value={expensePercentage} />
          </Grid>
          <Grid item xs={6}>
            Your Salary
          </Grid>
          <Grid item xs={6}>
            <MoneyDisplay value={salary} />
          </Grid>
          <Grid item xs={6}>
            Your Expenses
          </Grid>
          <Grid item xs={6}>
            <MoneyDisplay value={expenses} />
          </Grid>
          <Grid item xs={6}>
            Your Savings
          </Grid>
          <Grid item xs={6}>
            <MoneyDisplay value={savings} />
          </Grid>
          <Grid item xs={6} />
          <Grid item xs={6}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleEdit}
            >
              Edit
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Container>
  );
}

export default Planner;
