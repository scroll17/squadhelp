import React from 'react';
import connect from "react-redux/es/connect/connect";

import style from './Contest.module.sass'

import LinkToContestById from "../../Links/LinkToContestById/LinkToContestById";

import statusInIcon from "../../../utils/statusInIcon";

function Contest(props) {
    const { id, title } = props;
    const { contestType, type, whatVentureDoes, status } = props;
    const { price } = props;

    return (
        <div className={style.contest}>

            <div className={style.contestInfo}>
                <LinkToContestById id={id} title={title}/>

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
                        {statusInIcon(status)}
                        {status}
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
