import React, { useState } from 'react';
import { getUserInfo } from './utils/session';
import { INITIAL_STATE } from './utils/constants';

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const cookieInfo = getUserInfo() || {};
  const [state, setState] = useState({ ...INITIAL_STATE, ...cookieInfo });

  const handleSetState = newState => {
    setState({ ...state, ...newState });
  }

  return <AppContext.Provider value={{ state, handleSetState }}>{children}</AppContext.Provider>;
};

export default AppProvider;
export { AppContext };