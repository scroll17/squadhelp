import React, {Fragment} from 'react'
import {isNull, omit, startCase, isObject} from 'lodash';

export default (obj, omitFields) => {

    const fields = Object.keys(omit(obj, omitFields));

    let data = [];
    fields.forEach(field => {
        if (!isNull(obj[field])) {
            const fieldData = obj[field];
            data.push(
                <Fragment key={field}>
                    <h2>{startCase(field)}</h2>
                    <p>{
                        isObject(fieldData) ? fieldData.join(', ') : fieldData
                    }</p>
                </Fragment>
            )
        }
    });
    return data
};