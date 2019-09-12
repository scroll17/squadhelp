import history from "../../boot/browserHistory";
import { flatten } from 'lodash'

export default (searchParams, customUrl) => {
    let url = customUrl || history.location.pathname;

    const newSearch = searchParams.map( params => {
        return flatten(params).join('');
    });

    return{
        pathname: url,
        search: newSearch.join('')
    }
};