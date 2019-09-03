import React from 'react';
import { Field } from 'redux-form';

import style from './JoinAs.module.sass';

function JoinAs(props) {
    const { roles } = props;

    return (
        <div className={style.row}>
            <div className={style.joinAs}>

                <span className={style.input}>
                    <Field name="role" component="input" type="radio"  value={roles} />
                </span>

                   <div className={style.joinLabel}>
                     Join As a {roles}
                   </div>
                    <div className={style.textJoin}>
                     I am looking for a Name, Logo or Tagline for my business, brand or product.
                   </div>

            </div>
        </div>
    )
}
export default JoinAs;
