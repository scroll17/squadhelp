import React, { useEffect, useMemo } from 'react';

import connect from "react-redux/es/connect/connect";
import { Link } from "react-router-dom";

import style from './ModerationPage.module.sass';

import Entry from "../../components/Dashboard/ContestInfo/Entry/Entry";


import { getAllEntries, updateValidityEntry } from "../../actions/actionCreators/adminActionCreator";

import LinkToContestById from "../../components/Links/LinkToContestById/LinkToContestById";

import { URL } from "../../api/baseURL";
import { STATUS_OF_CONTEST_AND_ENTRY } from "../../constants";


function ModerationPage(props){
    const { entries } = props;
    const { updateValidityEntry } = props;

    const { VALID, INVALID } = STATUS_OF_CONTEST_AND_ENTRY;

    useEffect(() => {
        props.getAllEntries()
    }, []);

    const showEntries = useMemo(() => {
        entries.map( entry => {
            const {id, contestId, contestInfo, User: { email } } = entry;

            return (
                <div className={style.container} key={id}>

                    <LinkToContestById
                        id={contestId}
                        title={contestInfo.title}
                    />

                    <Entry
                        {...entry}
                        isModerationPage={true}
                    />

                    <div className={style.validation}>
                        <div className={style.valid}
                             onClick={() => updateValidityEntry(id, VALID, email)}
                        >
                            {VALID}
                        </div>
                        <div className={style.noValid}
                             onClick={() => updateValidityEntry(id, INVALID, email)}
                        >
                            {INVALID}
                        </div>
                    </div>
                </div>
            )
        })
    }, [entries]);

    return(
        <div className={style.listEntries}>
            <div className={style.home}>
                <Link to={URL.HOME}>
                    Home
                </Link>
            </div>
            {showEntries}
        </div>
    )
}

const mapStateToProps = (state) => ({
    entries: state.adminReducer.entries,
});
const mapDispatchToProps = dispatch => ({
    getAllEntries: () => dispatch(getAllEntries()),
    updateValidityEntry: (id, status, userEmail) => dispatch(updateValidityEntry(id, status, userEmail))
});
export default connect(mapStateToProps, mapDispatchToProps)(ModerationPage);

