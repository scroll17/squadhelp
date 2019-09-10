import axios from "../axios/config";
import {adminURL, URL} from "../baseURL";

export const getAllUser = () =>  axios.get(`${adminURL}${URL.ALL_USER}`);
export const banUserById = (userId, isBanned) => axios.put(`${adminURL}${URL.USER}/${userId}`, { isBanned });
