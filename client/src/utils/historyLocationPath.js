import history from "../boot/browserHistory";
import { last, isEqual } from 'lodash';

export default (links, customUrl) => {
    let url =  (customUrl || history.location.pathname).split('/');

    links.forEach( (nextLink) => {
        const lastLink = last(url);
        const newLink = nextLink.replace(/\//, '');

        if(!isEqual(lastLink, newLink)){
            url.push(newLink)
        }
    });

    console.log(url.join('/'));
    return url.join('/')
};