import axios from "../axios/config";
import {entriesURL, URL, SEARCH} from "../baseURL";

export const createEntries = ( entry ) => axios.post(`${entriesURL}${URL.CREATE}`,  entry );

export const updateEntryById = (id, updateData, updateType) => (
    axios.put(`${entriesURL}${URL.ENTRY}/${id}${SEARCH.TYPE}${updateType}`, {
        updateData
    })
);