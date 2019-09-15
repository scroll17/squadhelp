import React from 'react';
import connect from "react-redux/es/connect/connect";


import style from './Brief.module.sass'
import Avatar from "../../../Avatart/Avatar";
import {closeOrOpenConnection} from "../../../../actions/actionCreators/chatActionCreator";
import {startConversation} from "../../../../api/socket/chatController";
import { ROLE } from "../../../../constants";
import { isEqual } from 'lodash'

function ContestInfo(props) {
    const { price, userId, User } = props.contestInfo;
    const { userRole } = props;

    const clickToStartConversation = () => {
        props.closeOrOpenConnection(false);
        return startConversation({
            id: userId,
            ...User
        })
    };

    return (
        <div className={style.statusStatusContainer}>
            <div className={style.contestStatus}>
                <h1 className={style.contestPrice}>
                    <i className="far fa-gem"/>
                    ${price}
                </h1>
                <div className={style.entries}>
                    <span>
                        <i className="fa fa-user" /> 0
                    </span>
                    <p>Entries</p>
                </div>
            </div>

            <div className={style.contestHolder}>
                <h1>
                    Contest holder
                </h1>
                <div className={style.holderInfo}>
                    <Avatar customAvatar={User.avatar} size={62}/>
                    <span>
                        {console.log(userRole)}
                        {User.displayName}
                        {
                            !isEqual(userRole, ROLE.BUYER) &&
                            <i className="far fa-comments" onClick={clickToStartConversation}/>
                        }
                    </span>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    userRole: state.userReducers.user.role
});
const mapDispatchToProps = dispatch => ({
    closeOrOpenConnection: (chatIsOpen) => dispatch(closeOrOpenConnection(chatIsOpen)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ContestInfo);
