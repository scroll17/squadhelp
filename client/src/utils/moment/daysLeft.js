import moment from 'moment'

export default (date) => {

    const eventDate = moment(date);
    const todayDate = moment();

    return moment(todayDate - eventDate).format('D[d,] HH[h]')
};