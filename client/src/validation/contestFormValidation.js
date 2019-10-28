import { isObject } from "lodash"

export default (value) => {
    if(!value){
        return "Please fill this field"
    }else if(value && !isObject(value)){
        const str = value.replace(/\s+/g, '');
        if(str.length === 0){
            return "Please fill this field"
        }
    }
};