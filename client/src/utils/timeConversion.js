import moment from 'moment'

const momentTime = (time) => moment( new Date(time), 'day months MM YYYY HH:mm:ss');

export default (time, aPlace) => {
    const momentTime = momentTime(time);

    const MM_DD = momentTime.format('MM/DD');

    const diff = moment().diff(
        momentTime.format('YYYY-MM-DD'), 'd'
    );


    const hoursToday = momentTime.format('h:mm A');
    const dayAgo = moment(MM_DD, 'MM/DD').toNow();
    const daysPassed = momentTime.format('DD MMM');


    if(aPlace === 'conversation'){
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