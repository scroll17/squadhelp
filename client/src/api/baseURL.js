const HOST= {
  LOCALHOST: 'localhost',
  MY_IP: '192.168.0.102'
};

export const baseURL = `http://${HOST.MY_IP}:3000`;

export const restURL = `${baseURL}/api`;


export const URL = {
  // API USER
  USER: '/user',
  LOGIN: '/login',
  LOGOUT: "/logout",
  AUTHORIZE: '/authorize',
  ALL_USER: "/alluser",
  SIGN_UP: "/signup",
  REFRESH: "/refresh",

  // API CONTEST
  CONTEST: '/contest',
  CONTEST_PRICE: '/contest/price',


  // CONTEST
  CONTEST_TYPE: "/contesttype",
  NAME_IDEAS: "/Name-Ideas",

  // USER
  HOME: '/',
  NOT_FOUND: "/notfound",
  ADMIN_PANEL: "/adminpanel",
  DASHBOARD: "/dashboard",
  MY_ACCOUNT: "/myaccount",
  MESSAGE: "/messages",
  AFFILIATE_DASHBOARD: "/affiliate-dashboard"
};

export const SEARCH = {
  TYPE: '?type='
};
