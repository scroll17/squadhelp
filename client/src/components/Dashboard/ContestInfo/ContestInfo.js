import React from 'react';
import { Link } from "react-router-dom";
import connect from "react-redux/es/connect/connect";

import style from './Contest.module.sass'

import { URL } from "../../../api/baseURL";
import historyLocationTo from "../../../utils/historyLocationPath";

import { getContestById } from "../../../actions/actionCreators/dashboardActionCreator";

function Contest(props) {
    const { id, title } = props;
    const { contestType, type, whatVentureDoes } = props;
    const { price } = props;

    return (
        <div className={style.contest}>

        </div>
    )
}
const mapStateToProps = (state) => ({
    sideMenuIsOpen: state.dashboardReducer.sideMenuIsOpen,
});
const mapDispatchToProps = dispatch => ({
    getContestById: (id) => dispatch(getContestById(id)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Contest);
