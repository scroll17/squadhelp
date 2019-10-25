import { cloneDeep, isObject, isArray } from "lodash";

export default (obj, options) => {
    const newObject = cloneDeep(obj);

    if(!isObject(newObject)){
        return null
    }

    for (let field in newObject){
        let fieldValue = newObject[field];

        if(isArray(fieldValue)){
            newObject[field] = fieldValue.map( value => {
                return {
                    value: value,
                    label: value,
                }
            })
        }else if(options.includes(field)){
            newObject[field] = {
                value: fieldValue,
                label: fieldValue,
            }
        }
    }

    return newObject
}