import { cloneDeep, isObject, isArray, isNull } from "lodash";

export default (obj) => {
    const newObject = cloneDeep(obj);

    for (let field in newObject){
        let fieldValue = newObject[field];

        if(isArray(fieldValue)){

            newObject[field] = fieldValue.map( obj => {
                return obj.value;
            })
        }else if(isObject(fieldValue)){

            newObject[field] = fieldValue.value
        }else if(isNull(fieldValue)){

            newObject[field] = undefined
        }
    }

    return newObject
}