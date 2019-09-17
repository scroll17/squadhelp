import React, { useEffect } from 'react';

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
    const { getAllEntries, updateValidityEntry } = props;

    const { VALID, INVALID } = STATUS_OF_CONTEST_AND_ENTRY;

    useEffect(() => {
        getAllEntries()
    }, []);

    return(
        <div className={style.listEntries}>
            <div className={style.home}>
                <Link to={URL.HOME}>
                    Home
                </Link>
            </div>
            {entries.map( entry => {
                const {id, contestId, contestInfo} = entry;
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
                                 onClick={() => updateValidityEntry(id, VALID)}
                            >
                                {VALID}
                            </div>
                            <div className={style.noValid}
                                 onClick={() => updateValidityEntry(id, INVALID)}
                            >
                                {INVALID}
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

const mapStateToProps = (state) => ({
    entries: state.adminReducer.entries,
});
const mapDispatchToProps = dispatch => ({
    getAllEntries: () => dispatch(getAllEntries()),
    updateValidityEntry: (id, status) => dispatch(updateValidityEntry(id, status))
});
export default connect(mapStateToProps, mapDispatchToProps)(ModerationPage);

