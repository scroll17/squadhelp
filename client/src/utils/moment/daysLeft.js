import moment from 'moment'

export default (date) => {

    const eventDate = moment(date, "YYYY-MM-DD HH:mm:ss");
    const todayDate = moment();

    const diff = moment.duration(todayDate.diff(eventDate));
    const { days, hours } = diff._data;

    return `${days}d, ${hours}h`
};