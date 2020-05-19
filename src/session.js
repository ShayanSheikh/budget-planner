import Cookies from 'js-cookie'

const getUserInfo = () => {
  const userInfo = Cookies.get('__userInfo');
  return userInfo ? JSON.parse(userInfo) : userInfo;
};

const setUserInfo = userInfo => {
  const currUserInfo = getUserInfo();
  const combinedUserInfo = { ...currUserInfo, userInfo };
  Cookies.set('__userInfo', JSON.stringify(combinedUserInfo));
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
  Cookies.remove('__userInfo');
};

export {
  getUserInfo,
  setUserInfo,
  getSession,
  logIn,
  logOut
}