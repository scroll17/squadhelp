import React from 'react';
import { Link } from "react-router-dom";
import connect from "react-redux/es/connect/connect";

import style from './Contest.module.sass'

import { URL, SEARCH } from "../../../api/baseURL";
import historyLocationSearch from "../../../utils/history/historyLocationSearch";

import { getContestById } from "../../../actions/actionCreators/dashboardContestsActionCreator";

function Contest(props) {
    const { id, title } = props;
    const { contestType, type, whatVentureDoes } = props;
    const { price } = props;

    return (
        <div className={style.contest}>

            <div className={style.contestInfo}>

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

                <p className={style.contestType}>
                    {contestType} / { type ? type.join(' & ') : props.style }
                </p>

                <p className={style.typeOfVenture}>{whatVentureDoes}</p>

                <ul className={style.statusInfo}>
                    <li className={style.prize}>
                        <i className="fa fa-check-circle" />
                        Guaranteed prize
                    </li>
                    <li className={style.status}>
                        <i className="fa fa-times-circle" />
                        Awaiting
                    </li>
                    <li className={style.price}>
                        <i className="fa fa-gem" />
                        {price}
                    </li>
                </ul>

            </div>

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
