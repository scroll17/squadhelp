import React, {Fragment} from 'react'
import {isNull, omit, startCase, isEqual} from 'lodash';

import { CONTEST_USER_FILE } from "../constants";


export default (obj, omitFields) => {
    const fields = Object.keys(omit(obj, omitFields));

    let data = [];

    fields.forEach(field => {
        if (!isNull(obj[field])) {
            let fieldData;

            if(isEqual(field, 'file')){

                const file = obj[field];
                const filePath = `${CONTEST_USER_FILE}${file}`;
                fieldData = (
                    <a href={filePath} download>
                        {file}
                    </a>
                );

            }else if(isEqual(field, 'style')){

                fieldData = obj[field].join(', ')
            }else{

                fieldData = obj[field]
            }

            data.push(
                <Fragment key={field}>
                    <h2>{startCase(field)}</h2>
                    <p>{
                        fieldData
                    }</p>
                </Fragment>
            )
        }
    });
    return data
};