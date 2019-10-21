import moment from 'moment'
import { momentConversion } from './timeConversion'

export default (array) => {
    return array.sort((prevItem, nextItem) => {
        let dayOne = momentConversion(prevItem.lastMessage.time).format("HH:hh");
        let dayTwo = momentConversion(nextItem.lastMessage.time).format("HH:hh");

        if (moment(dayOne).isBefore(dayTwo)){
            return -1;
        }
        else if (moment(dayOne).isAfter(dayTwo)) {
            return 1;}
        else if (moment(dayOne).isSame(dayTwo)) {
            return 0;}
    })
}