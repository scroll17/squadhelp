import React, { useState }  from 'react';
import connect from "react-redux/es/connect/connect";

import { Field, reduxForm } from 'redux-form';

import DropZone from "../../../Forms/ContestForms/DropZone/DropZone";

import style from './StartEntry.module.sass'

import { FORM, CONTEST } from "../../../../constants";
import { createEntry } from "../../../../actions/actionCreators/dashboardEntriesActionCreator";

import { isEqual } from 'lodash'


let ContestInfo = (props) => {
    const { typeOfContest, createEntry } = props;

    const { handleSubmit, submitting, pristine } = props;

    const [ showFields, setShowFields ] = useState(false);


    const submit = (values) =>{
        return createEntry(values)
    };

    return (
        <div className={style.startEntry}>

            { showFields ?
                <form onSubmit={handleSubmit(submit)} className={style.resultsForm}>
                    <div className={style.title} style={isEqual(typeOfContest, CONTEST.LOGO) ? {flexGrow: 0} : null}>
                        {isEqual(typeOfContest, CONTEST.LOGO) ?
                            <>
                                <p>Choose file</p>
                                <Field name={'file'}
                                       component={DropZone}
                                />
                            </>
                            :
                            <>
                                <p>Input your Entry</p>
                                <Field name={'text'}
                                       component={'input'}
                                       type={'text'}
                                />
                            </>
                        }
                    </div>
                    <button type="submit" disabled={pristine || submitting} className={style.button}>
                        submit
                    </button>
                </form>
                :
                <div className={style.button} onClick={() => setShowFields(true)}>
                    start entry
                </div>
            }

        </div>
    )
};


ContestInfo = reduxForm ({
    form: FORM.ENTRIES,
})(ContestInfo);


const mapStateToProps = (state) => ({});
const mapDispatchToProps = dispatch => ({
    createEntry: (values) => dispatch(createEntry(values)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ContestInfo);
