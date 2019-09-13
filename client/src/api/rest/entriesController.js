import axios from "../axios/config";
import {entriesURL, URL} from "../baseURL";

export const createEntries = ( entry ) => axios.post(`${entriesURL}${URL.CREATE}`,  entry );

