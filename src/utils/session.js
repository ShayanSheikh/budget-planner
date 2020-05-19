import Cookies from 'js-cookie';
import { COOKIES } from './constants';

const getUserInfo = () => {
  const userInfo = Cookies.get(COOKIES.USER_INFO);
  return userInfo ? JSON.parse(userInfo) : userInfo;
};

const setUserInfo = userInfo => {
  const currUserInfo = getUserInfo();
  const combinedUserInfo = { ...currUserInfo, ...userInfo };
  Cookies.set(COOKIES.USER_INFO, JSON.stringify(combinedUserInfo));
};

const getSession = () => {
  return Cookies.get(COOKIES.SESSION);
}

const logIn = (token, user) => {
  Cookies.set(COOKIES.SESSION, token);
  const userInfo = getUserInfo() || {};
  setUserInfo({ ...userInfo, user });
};

const logOut = () => {
  Cookies.remove(COOKIES.SESSION);
  Cookies.remove(COOKIES.USER_INFO);
};

export {
  getUserInfo,
  setUserInfo,
  getSession,
  logIn,
  logOut
}