export default function* (history, call, url){
    if(history.length > 2){
        yield call(history.goBack)
    }else{
        yield call(history.push, url);
    }
};