import moment from 'moment'
import { momentConversion } from './timeConversion'

export default (array) => {
    return array.sort((prevItem, nextItem) => {
        let dayOne = momentConversion(prevItem.lastMessage.time).format("HH:hh");
        let dayTwo = momentConversion(nextItem.lastMessage.time).format("HH:hh");

        if (moment(dayOne).isBefore(dayTwo)){
            console.log('-1')
            return -1;
        }
        else if (moment(dayOne).isAfter(dayTwo)) {
            console.log('1')
            return 1;}
        else if (moment(dayOne).isSame(dayTwo)) {
            console.log('0')
            return 0;}
    })
}