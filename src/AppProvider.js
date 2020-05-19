import React, { useState } from 'react';
import { getUserInfo } from './session';

const AppContext = React.createContext();

const initialState = {
  user: null,
  elections: {
    expensePercentage: 1,
    salary: ''
  },
  confirmed: false
}

const AppProvider = ({ children }) => {
  const cookieInfo = getUserInfo() || {};
  const [state, setState] = useState({ ...initialState, ...cookieInfo })

  return <AppContext.Provider value={{ state, setState }}>{children}</AppContext.Provider>;
};

export default AppProvider;
export { AppContext };