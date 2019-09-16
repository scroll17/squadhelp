import axios from "../axios/config";
import {adminURL, URL} from "../baseURL";

export const getAllUser = () =>  axios.get(`${adminURL}${URL.ALL_USER}`);
export const banUserById = (userId, isBanned) => axios.put(`${adminURL}${URL.USER}/${userId}`, { isBanned });

export const getAllEntries = () =>  axios.get(`${adminURL}${URL.ALL_ENTRIES}`);
export const updateValidityStatusEntry = (id, status) => axios.put(`${adminURL}${URL.ENTRY}/${id}`, { status });