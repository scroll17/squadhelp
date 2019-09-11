const HOST= {
  LOCALHOST: 'localhost',
  MY_IP_105: '192.168.0.105',
  MY_IP_107: '192.168.0.107'
};

export const baseURL = `http://${HOST.MY_IP_107}:3000`;

export const userURL = `${baseURL}/user`;
export const adminURL = `${baseURL}/admin`;
export const contestURL = `${baseURL}/contest`;
export const dashboardURL = `${baseURL}/dashboard`;


export const URL = {
  // API USER
  USER: '/user',
  LOGIN: '/login',
  LOGOUT: "/logout",
  AUTHORIZE: '/authorize',
  ALL_USER: "/alluser",
  SIGN_UP: "/signup",
  REFRESH: "/refresh",
  USER_CONTESTS: '/contests',

  // API CONTEST
  CONTEST: '/contest',
  CONTEST_PRICE: '/contest/price',


  // CONTEST
  CONTESTS: '/contests',
  MY_CONTESTS: "/my-contests",
  CONTEST_TYPE: "/contest-type",
  NAME_IDEAS: "/Name-Ideas",

  // USER
  HOME: '/',
  NOT_FOUND: "/notfound",
  ADMIN_PANEL: "/adminpanel",
  DASHBOARD: "/dashboard",
  MY_ACCOUNT: "/my-account",
};

export const SEARCH = {
  TYPE: '?type='
};
