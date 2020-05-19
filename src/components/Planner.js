import React, { useState, useEffect, useContext } from 'react';
import { setUserInfo } from '../utils/session';
import { Button, Container, Grid, Typography, Slider, TextField } from '@material-ui/core';
import { MoneyDisplay, SalaryInput } from '.';
import { AppContext } from '../AppProvider';

const Planner = () => {
  const { state, handleSetState } = useContext(AppContext);
  const { user, elections } = state;

  const [expensePercentage, setExpensePercentage] = useState(elections.expensePercentage);
  const [salary, setSalary] = useState(elections.salary);
  const [expenses, setExpenses] = useState('');
  const [savings, setSavings] = useState('');

  useEffect(() => {
    setExpenses(salary / 12 * expensePercentage / 100);
    setSavings(salary / 12 * (1 - expensePercentage / 100));
  }, [salary, expensePercentage]);

  const handleSubmit = () => {
    const userInfo = {
      elections: { salary, expensePercentage },
      confirmed: true
    }
    handleSetState(userInfo);
    setUserInfo(userInfo);
  };

  return (
    <>
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
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default Planner;
