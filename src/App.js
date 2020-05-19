import React from 'react';
import { getSession } from './session';
import { Login, Planner } from './components';

const App = () => {
  return (
    getSession() ?
    <Planner />
    :
    <Login />
  );
}

export default App;
