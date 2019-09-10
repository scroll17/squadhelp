import React from 'react';
import style from './Header.module.sass'

import connect from "react-redux/es/connect/connect";

import { isEqual } from 'lodash'

import { startFindUsers, closeConversation, closeStageFindUsers } from "../../../actions/actionCreators/chatActionCreator";
import { leaveTheRoom } from "../../../api/socket/chatController";
import { STAGE_OF_CHAT } from "../../../constants/chat";

function Header(props){
    const { stageNow, openConversation, resetField } = props;
    const { startFindUsers, closeConversation, closeStageFindUsers } = props;

    const toFindUsers = () => {
        if(isEqual(stageNow, STAGE_OF_CHAT.FIND_USERS)){
            closeStageFindUsers(STAGE_OF_CHAT.BEGIN);
            resetField()
        }else {
            startFindUsers();
        }
    };

    const toCloseConversation = () => {
        leaveTheRoom();
        closeConversation(openConversation)
    };

    return(
            <div className={style.navBar}>
                {
                    isEqual(stageNow, STAGE_OF_CHAT.CONVERSATION) ?
                        <>
                            <div className={style.closeConversation} onClick={() => toCloseConversation(openConversation)}>
                                <i className="fas fa-chevron-left" />
                                <span>{openConversation.title}</span>
                            </div>
                            <div className={style.toolsConversation}>
                               {/* <i className="fas fa-ellipsis-v" />*/}
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
                                <i className="fas fa-search" onClick={toFindUsers}/>
                                <i className="fas fa-bars" />
                            </div>
                        </>
                }
            </div>
    )
}

const mapStateToProps = (state) => ({
    stageNow: state.chatReducers.stageNow,
    openConversation: state.chatConversationsReducer.openConversation,
});
const mapDispatchToProps = dispatch => ({
    closeConversation: (openConversation) => dispatch(closeConversation(openConversation)),
    startFindUsers: () => dispatch(startFindUsers()),
    closeStageFindUsers: (nextStage) => dispatch(closeStageFindUsers(nextStage)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Header);

