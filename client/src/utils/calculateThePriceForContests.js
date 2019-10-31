
import { size, isEmpty, xor } from 'lodash';

export default (priceOfContest, contestForms) => {

    let price;

    Object.keys(priceOfContest).forEach( contests => {

        const arrayPriceOfContests = contests.split(",");

        if(isEmpty(xor(arrayPriceOfContests, contestForms))){

            price = priceOfContest[contests] / size(contestForms)

        }
    });

    return price
}