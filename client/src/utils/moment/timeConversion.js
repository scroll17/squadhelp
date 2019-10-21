import moment from 'moment'
import { STAGE_OF_CHAT } from "../../constants";

const momentTime = (time) => moment( new Date(time), 'day months MM YYYY HH:mm:ss');

export default (time, aPlace) => {
    const newTime = momentTime(time);

    const MM_DD = newTime.format('MM/DD');

    const diff = moment().diff(
        newTime.format('YYYY-MM-DD'), 'd'
    );


    const hoursToday = newTime.format('h:mm A');
    const dayAgo = moment(MM_DD, 'MM/DD').toNow();
    const daysPassed = newTime.format('DD MMM');


    if(aPlace === STAGE_OF_CHAT.CONVERSATION){
        return hoursToday
    }else if(diff === 0){
        return hoursToday
    }else if(diff === -1){
        return dayAgo
    }else{
        return daysPassed
    }
};

export const momentConversion = momentTime;