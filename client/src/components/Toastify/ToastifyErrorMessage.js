import React  from 'react'
import { isObject, isEqual } from 'lodash'

const blockMessageStyle = {
  display: "flex",
  flexDirection: "column",
  fontFamily: "Arial, sans-serif"
};
const headerStyle = {
    fontSize: "16px",
    fontWeight: "600",
    marginBottom: "5px"
};

export default (header, body) => {
    const objHaveProp = (obj, prop) => obj.hasOwnProperty(prop);

    const compareValues = (value1, value2) => {
        const val1Upper = value1.toUpperCase();
        const val2Upper = value2.toUpperCase();

        if(isEqual(val1Upper, val2Upper)){
            return null
        }else{
            return value1
        }
    };

    const showBodyErr = () => {
        let message;

        if(isObject(body)){
            if(objHaveProp(body, "statusText")){
                message = compareValues(body.statusText, header)
            }
        }else{
            message = compareValues(body, header);
        }

        return <span>{message}</span>
    };

    return(
        <div style={blockMessageStyle}>
            <span style={headerStyle}>{header}</span>
            {showBodyErr()}
        </div>
    )
};