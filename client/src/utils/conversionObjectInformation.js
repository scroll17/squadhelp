import React, {Fragment} from 'react'
import {isNull, omit} from 'lodash';

export default (obj, omitFields) => {
    const fields = Object.keys(omit(obj, omitFields));

    let data = [];
    fields.forEach(field => {
        if (!isNull(obj[field])) {
            data.push(
                <Fragment key={field}>
                    <h2>{field}</h2>
                    <p>{obj[field]}</p>
                </Fragment>
            )
        }
    });
    return data
};