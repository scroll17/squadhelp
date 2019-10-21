import React from 'react';
import {Link} from "react-router-dom";
import connect from "react-redux/es/connect/connect";

import style from './LinkToContestById.module.sass'

import {URL, SEARCH} from "../../../api/baseURL";
import historyLocationSearch from "../../../utils/history/historyLocationSearch";

import {getContestById} from "../../../actions/actionCreators/dashboardContestsActionCreator";

function LinkToContestById(props) {
    const {id, title} = props;

    return (
        <Link
            onClick={() => props.getContestById(id)}
            to={historyLocationSearch(
                [[SEARCH.ID, id]],
                `${URL.DASHBOARD}${URL.CONTEST}`
            )}
            className={style.title}
        >
            {title}
            <span> (#{id})</span>
        </Link>
    )
}

const mapStateToProps = (state) => ({});
const mapDispatchToProps = dispatch => ({
    getContestById: (id) => dispatch(getContestById(id)),
});
export default connect(mapStateToProps, mapDispatchToProps)(LinkToContestById);
