import React from 'react';
import { Link } from "react-router-dom";
import connect from "react-redux/es/connect/connect";

import style from './Entry.module.sass'

import { URL, SEARCH } from "../../../api/baseURL";
import { HEX_COLOR, ICON } from "../../../constants";

import historyLocationSearch from "../../../utils/history/historyLocationSearch";
import statusInIcon from "../../../utils/statusInIcon";

import { getContestById } from "../../../actions/actionCreators/dashboardContestsActionCreator";

function Contest(props) {
    const { contestId, status, isValid, text, file, id } = props;
    const { title, contestType } = props.contestInfo;

    return (
        <div className={style.contest}>
            <div className={style.contestInfo}>
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
                <p className={style.typeOfVenture}>
                    <span>Content entry:</span>
                    {text || file}
                </p>

                <ul className={style.statusInfo}>
                    <li className={style.prize}>
                        {isValid ? ICON.CHECK : ICON.TIMES}

                        validated:
                        <span style={isValid ? {color: HEX_COLOR.GREEN} : {color: HEX_COLOR.ORANGE}}>
                            {`${isValid}`}
                        </span>
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
export default connect(mapStateToProps, mapDispatchToProps)(Contest);
