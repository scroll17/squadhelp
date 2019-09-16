import React from 'react';
import connect from "react-redux/es/connect/connect";

import style from './Contest.module.sass'

import GetContestLink from "../../../Links/GetContestLink/GetContestLink";


function Contest(props) {
    const { id, title } = props;
    const { contestType, type, whatVentureDoes } = props;
    const { price } = props;

    return (
        <div className={style.contest}>
            <div className={style.contestInfo}>
                <GetContestLink id={id} title={title}/>

                <p className={style.contestType}>
                    {contestType} / { type ? type.join(' & ') : props.style }
                </p>

                <p className={style.typeOfVenture}>
                    {whatVentureDoes}
                </p>

                <ul className={style.statusInfo}>
                    <li className={style.price}>
                        <i className="fa fa-gem" />
                        {price}
                    </li>
                    <li className={style.status}>
                        <i className="fa fa-times-circle" />
                        Awaiting
                    </li>
                </ul>
            </div>
        </div>
    )
}
const mapStateToProps = (state) => ({
    sideMenuIsOpen: state.dashboardReducer.sideMenuIsOpen,
});
export default connect(mapStateToProps)(Contest);
