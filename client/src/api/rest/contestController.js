import axios from "../axios/config";
import {contestURL, paymentURL, URL} from "../baseURL";

export const createContest = ( contest ) => axios.post(`${contestURL}${URL.CONTEST}`,  contest );
export const getPriceOfContests = () => axios.get(`${contestURL}${URL.CONTEST_PRICE}`);


export const payContests = (data) => axios.post(`${paymentURL}${URL.CONTEST}`, {paymentData: data});
