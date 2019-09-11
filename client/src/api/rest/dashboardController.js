import axios from "../axios/config";
import {dashboardURL, URL} from "../baseURL";

export const getContestById = (id) =>  axios.get(`${dashboardURL}${URL.CONTESTS}/${id}`);
