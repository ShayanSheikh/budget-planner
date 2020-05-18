import React, { useState, useEffect } from 'react';
import { getUserInfo } from './session';

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, setState] = useState({
    user: null,
    elections: {
      expensePercentage: 1,
      salary: ''
    },
    confirmed: false
  });

  useEffect(() => {
    const userInfo = getUserInfo();
    console.log(userInfo)
    if (userInfo) setState(s => ({ ...s, ...userInfo }));
  }, []);

  return <AppContext.Provider value={{ state, setState }}>{children}</AppContext.Provider>;
};

export default AppProvider;
export { AppContext };