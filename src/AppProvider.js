import React, { useState } from 'react';

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
  return <AppContext.Provider value={{ state, setState }}>{children}</AppContext.Provider>;
};

export default AppProvider;
export { AppContext };