import Cookies from 'js-cookie'

const getSession = () => {
  const jwt = Cookies.get('__session');
  return jwt;
}

const logIn = (token) => {
  Cookies.set('__session', token)
};

const logOut = () => {
  Cookies.remove('__session');
};

export {
  getSession,
  logIn,
  logOut
}