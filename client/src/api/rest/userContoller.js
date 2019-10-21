import axios from "../axios/config";
import {userURL, URL} from "../baseURL";
import {TOKEN} from "../../constants";

export const loginUser = ( user ) => axios.post(`${userURL}${URL.LOGIN}`,  user );
export const createUser = ( user ) => axios.post(`${userURL}${URL.SIGN_UP}`,  user );
export const userLogout = (refreshToken) =>  axios.delete(`${userURL}${URL.LOGOUT}`, {data: { refreshToken }});

export const getUser = () =>  axios.get(`${userURL}${URL.AUTHORIZE}`);
export const refreshToken = () =>  axios.post(`${userURL}${URL.REFRESH}`, {refreshToken: localStorage.getItem(TOKEN.REFRESH_TOKEN)});

export const getUserContests = () => axios.get(`${userURL}${URL.USER_CONTESTS}`);
export const getUserEntries = () => axios.get(`${userURL}${URL.USER_ENTRIES}`);
