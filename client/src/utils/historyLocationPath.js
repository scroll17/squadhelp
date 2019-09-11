import history from "../boot/browserHistory";
import { last, isEqual, compact } from 'lodash';

export default (...links) => {
    let url = compact(history.location.pathname.split('/'));

    links.forEach( (nextLink) => {
        const lastLink = last(url);

        if(!isEqual(`/${lastLink}`, nextLink)){
            url.push(nextLink)
        }
    }, url);


    console.log('url', url);
    console.log('url', url.join('/'));

    return url.join('')
};