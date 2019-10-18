import React from 'react';
import connect from "react-redux/es/connect/connect";

import style from './Contest.module.sass'

import LinkToContestById from "../../Links/LinkToContestById/LinkToContestById";

import statusInIcon from "../../../utils/statusInIcon";

import daysLeft from "../../../utils/moment/daysLeft";

import { CONTEST_STATUS } from "../../../constants";


function Contest(props) {
    const { id, title } = props;
    const { contestType, type, whatVentureDoes, status, numberOfEntry, updatedAt } = props;
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

            <ul className={style.entries}>
                <li>
                    <span>
                        <i className="fa fa-user" />
                        {numberOfEntry}
                    </span>
                    <p>Entries</p>
                </li>
                { status === CONTEST_STATUS.OPEN &&
                    <>
                        <li className={style.left}/>
                        <li>
                            <span>{daysLeft(updatedAt)}</span>
                            <p>Left</p>
                        </li>
                    </>
                }
            </ul>
        </div>
    )
}
const mapStateToProps = (state) => ({
    sideMenuIsOpen: state.dashboardReducer.sideMenuIsOpen,
});
export default connect(mapStateToProps)(Contest);
