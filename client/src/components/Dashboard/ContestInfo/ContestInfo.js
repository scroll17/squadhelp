import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import connect from "react-redux/es/connect/connect";

import style from './ContestInfo.module.sass'

import { URL } from "../../../api/baseURL";
import historyLocationTo from "../../../utils/historyLocationPath";

import history from "../../../boot/browserHistory";

import { getContestById } from "../../../actions/actionCreators/dashboardActionCreator";
import { isEmpty } from 'lodash'

function ContestInfo(props) {
    const { openContest } = props;

    useEffect(() => {
        console.log(history.location.pathname)
        // if(isEmpty(openContest)){
        //     props.getContestById()
        // }
    }, []);

    return (
        <div className={style.contestInfo}>
            {history.location.pathname}
        </div>
    )
}
const mapStateToProps = (state) => ({
    openContest: state.dashboardReducer.openContest,
});
const mapDispatchToProps = dispatch => ({
    getContestById: (id) => dispatch(getContestById(id)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ContestInfo);
