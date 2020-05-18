import Cookies from 'js-cookie'

const getUserInfo = () => {
  const userInfo = Cookies.get('__user');
  return userInfo ? JSON.parse(userInfo) : userInfo;
};

const setUserInfo = user => {
  Cookies.set('__user', JSON.stringify(user));
};

const getSession = () => {
  return Cookies.get('__session');
}

const logIn = (token, user) => {
  Cookies.set('__session', token);
  const userInfo = getUserInfo() || {};
  setUserInfo({ ...userInfo, user });
};

const logOut = () => {
  Cookies.remove('__session');
  Cookies.remove('__user');
};

export {
  getUserInfo,
  setUserInfo,
  getSession,
  logIn,
  logOut
}