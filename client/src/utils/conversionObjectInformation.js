import React, {Fragment} from 'react'
import {isNull, omit, startCase, isEqual} from 'lodash';

import { CONTEST_USER_FILE } from "../constants";
import createFilePathAndName from "./createFilePathAndName";

export default (obj, omitFields) => {
    const fields = Object.keys(omit(obj, omitFields));

    let data = [];

    fields.forEach(field => {
        if (!isNull(obj[field])) {
            let fieldData;

            if(isEqual(field, 'file')){

                const file = obj[field];
                const {filePath, fileName} = createFilePathAndName(file, CONTEST_USER_FILE);

                fieldData = (
                    <a href={filePath} download>
                        {fileName}
                    </a>
                );

            }else if(Array.isArray(obj[field])){

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