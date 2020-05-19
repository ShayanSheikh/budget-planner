const CLIENT_ID = '26226890893-7uke9sajq33a0ddg5896nfkvp7phulmd.apps.googleusercontent.com'

const COOKIES = {
  SESSION: '__session',
  USER_INFO: '__USER_INFO'
}

const INITIAL_STATE = {
  user: null,
  elections: {
    expensePercentage: 1,
    salary: ''
  },
  confirmed: false
}

export {
  CLIENT_ID,
  COOKIES,
  INITIAL_STATE
}