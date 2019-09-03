import axios from '../axios/config';

import { restURL, URL  } from '../baseURL';
import { TOKEN } from "../../constants";

//----- USER -----
export const loginUser = ( user ) => axios.post(`${restURL}${URL.LOGIN}`,  user );
export const createUser = ( user ) => axios.post(`${restURL}${URL.SIGN_UP}`,  user );
export const userLogout = (refreshToken) =>  axios.delete(`${restURL}${URL.LOGOUT}`, {data: { refreshToken }});

export const getUser = () =>  axios.get(`${restURL}${URL.AUTHORIZE}`);
export const refreshToken = () =>  axios.post(`${restURL}${URL.REFRESH}`, {refreshToken: localStorage.getItem(TOKEN.REFRESH_TOKEN)});

// ----- ADMIN -----
export const getAllUser = () =>  axios.get(`${restURL}${URL.ALL_USER}`);
export const banUserById = (userId, isBanned) => axios.put(`${restURL}${URL.USER}/${userId}`, { isBanned });



//----- CONTEST -----
export const createContest = ( contest ) => axios.post(`${restURL}${URL.CONTEST}`,  contest );
export const getPriceOfContests = () => axios.get(`${restURL}${URL.CONTEST_PRICE}`);
