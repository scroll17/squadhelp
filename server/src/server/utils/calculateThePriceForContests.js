const { isEmpty, xor } = require("lodash");
const convertMapToObject = require("./convertMapToObject");

module.exports = (contestPrice, arrayOfContests) => {

    let contestPriceObject;
    if( contestPrice instanceof Map ){

        contestPriceObject = convertMapToObject(contestPrice)
    }

    let price;

    Object.keys( contestPriceObject || contestPrice ).forEach( contests => {

        const arrayPriceOfContests = contests.split(",");

        if(isEmpty(xor(arrayPriceOfContests, arrayOfContests))){

            price = contestPriceObject[contests];

        }
    });

    return price;
};