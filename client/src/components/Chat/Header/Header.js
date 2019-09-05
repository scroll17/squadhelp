import React from 'react';
import style from './Header.module.sass'

import connect from "react-redux/es/connect/connect";

import { isEqual } from 'lodash'

import { setSearchUsers, closeConversation } from "../../../actions/actionCreators/chatActionCreator";
import { leaveTheRoom } from "../../../api/socket/chatController";
import {STAGE_OF_CHAT} from "../../../constants/chatConst";

function Header(props){
    const { stageNow, openConversation, resetField } = props;
    const { setSearchUsers, closeConversation } = props;

    const clickOnSearchButton = () => {
        if(isEqual(stageNow, STAGE_OF_CHAT.SEARCH_USERS)){
            setSearchUsers(STAGE_OF_CHAT.BEGIN)
        }else {
            setSearchUsers()
        }
        return resetField()
    };

    const clickToCloseConversation = () => {
        leaveTheRoom()
        return closeConversation()
    };

    return(
            <div className={style.navBar}>
                {
                    isEqual(stageNow, STAGE_OF_CHAT.CONVERSATION) ?
                        <>
                            <div className={style.closeConversation} onClick={clickToCloseConversation}>
                                <i className="fas fa-chevron-left" />
                                <span>{openConversation.title}</span>
                            </div>
                            <div className={style.toolsConversation}>
                                <i className="fas fa-ellipsis-v" />
                                <div className={style.iconConversation} />
                            </div>
                        </>
                        :
                        <>
                            <div className={style.company}>
                                <i className="fab fa-telegram" />
                                <span className={style.companyName}>Telegram</span>
                            </div>
                            <div className={style.tools}>
                                <i className="fas fa-search" onClick={clickOnSearchButton}/>
                                <i className="fas fa-bars" />
                            </div>
                        </>
                }
            </div>
    )
}

const mapStateToProps = (state) => ({
    stageNow: state.chatReducers.stageNow,
    openConversation: state.chatReducers.openConversation,
});
const mapDispatchToProps = dispatch => ({
    closeConversation: () => dispatch(closeConversation()),
    setSearchUsers: (toNextStage) => dispatch(setSearchUsers(toNextStage)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Header);

