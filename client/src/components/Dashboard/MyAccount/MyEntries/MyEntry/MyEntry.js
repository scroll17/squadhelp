import React from 'react';
import { Link } from "react-router-dom";
import connect from "react-redux/es/connect/connect";

import style from './MyEntry.module.sass'

import { URL, SEARCH } from "../../../../../api/baseURL";

import historyLocationSearch from "../../../../../utils/history/historyLocationSearch";
import statusInIcon from "../../../../../utils/statusInIcon";

import { getContestById } from "../../../../../actions/actionCreators/dashboardContestsActionCreator";

function MyEntry(props) {
    const { contestId, status, isValid, text, file, id } = props;
    const { title, contestType } = props.contestInfo;

    return (
        <div className={style.contest}>
            <div className={style.entryInfo}>
                <Link
                    onClick={() => props.getContestById(contestId)}
                    to={historyLocationSearch(
                        [[SEARCH.ID, contestId]],
                        `${URL.DASHBOARD}${URL.CONTEST}`
                    )}
                    className={style.title}
                >
                    {title}
                    <span> (#{id})</span>
                </Link>


                <p className={style.contestType}>
                    {contestType}
                </p>
                <p className={style.contentEntry}>
                    <span>Content entry:</span>
                    {text || file}
                </p>

                <ul className={style.statusInfo}>
                    <li className={style.isValid}>
                        {statusInIcon(isValid)}
                        {`${isValid}`}
                    </li>
                    <li className={style.status}>
                        {statusInIcon(status)}
                        {status}
                    </li>
                </ul>
            </div>
        </div>
    )
}
const mapStateToProps = (state) => ({});
const mapDispatchToProps = dispatch => ({
    getContestById: (id) => dispatch(getContestById(id)),
});
export default connect(mapStateToProps, mapDispatchToProps)(MyEntry);