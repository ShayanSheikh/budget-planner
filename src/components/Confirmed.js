import React, { useState, useEffect, useContext } from 'react';
import { setUserInfo } from '../utils/session';
import { Button, Container, Grid } from '@material-ui/core';
import { MoneyDisplay } from '.';
import { AppContext } from '../AppProvider';

const Confirmed = () => {
  const { state, handleSetState } = useContext(AppContext);
  const { user, elections } = state;

  const [expensePercentage] = useState(elections.expensePercentage);
  const [salary] = useState(elections.salary);
  const [expenses, setExpenses] = useState('');
  const [savings, setSavings] = useState('');

  useEffect(() => {
    setExpenses(salary / 12 * expensePercentage / 100);
    setSavings(salary / 12 * (1 - expensePercentage / 100));
  }, [salary, expensePercentage]);

  const handleEdit = () => {
    handleSetState({ confirmed: false });
    setUserInfo({ confirmed: false });
  };

  return (
    <>
      <h2>{`Thank You ${user}`}</h2>
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            Your Election
          </Grid>
          <Grid item xs={6}>
            {`${expensePercentage}%`}
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
    </>
  );
}

export default Confirmed;
