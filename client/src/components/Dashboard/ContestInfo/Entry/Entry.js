import React from 'react';
import connect from "react-redux/es/connect/connect";


import style from "./Entry.module.sass";

import Avatar from "../../../Avatart/Avatar";
import statusInIcon from "../../../../utils/statusInIcon";

import {startConversation} from "../../../../api/socket/chatController";
import {closeOrOpenConnection} from "../../../../actions/actionCreators/chatActionCreator";
import { updateEntryById, likeEntryById } from "../../../../actions/actionCreators/dashboardEntriesActionCreator";

import createFilePathAndName from "../../../../utils/createFilePathAndName";

import {
    ENTRY_USER_FILE,
    STATUS_OF_CONTEST_AND_ENTRY,
} from "../../../../constants";

import { isEqual } from 'lodash'

function Entry(props) {
    const {User, text, file, status, id, isValid, isModerationPage, liked} = props;
    const {displayName, avatar} = User;

    const styleForModerationPage = {
        display: "flex",
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%'
    };

    const likedEntryStyle = {
        color: "#28d2d0"
    };

    const fileData = createFilePathAndName(file, ENTRY_USER_FILE);

    return (
        <div className={style.entry} key={id}>
            <div className={style.entryInfo}>
                <div className={style.entryContent} style={isModerationPage ? styleForModerationPage : null}>
                    {file ?
                        <a href={fileData.filePath} download>
                            {fileData.fileName}
                        </a>
                        :
                        <span>{text}</span>
                    }
                    <p>
                        {statusInIcon(isValid || status)}
                        {isValid || status}
                    </p>
                </div>

                {!isModerationPage &&
                    <div className={style.entryAction}>
                        <i className="fas fa-heart"
                           style={liked ? likedEntryStyle : null}
                           onClick={() => props.likeEntryById(id, liked)}
                        />

                        {isEqual(status, STATUS_OF_CONTEST_AND_ENTRY.EXPECTATION) &&
                            <div>
                                <span onClick={() => props.updateEntryById(id, STATUS_OF_CONTEST_AND_ENTRY.RESOLVE)}>
                                    {STATUS_OF_CONTEST_AND_ENTRY.RESOLVE}
                                </span>
                                <span onClick={() => props.updateEntryById(id, STATUS_OF_CONTEST_AND_ENTRY.REJECT)}>
                                    {STATUS_OF_CONTEST_AND_ENTRY.REJECT}
                                </span>
                            </div>
                        }
                    </div>
                }
            </div>

            <div className={style.creativeInfo}>
                <Avatar size={50} customAvatar={avatar}/>
                <span>
                    {displayName}
                    <i className="far fa-comments"
                       onClick={() => {
                           props.closeOrOpenConnection(false);
                           return startConversation(User)
                       }}
                    />
                </span>
            </div>
        </div>
    )
}

Entry.defaultProps = {
    isModerationPage: false
};

const mapStateToProps = (state) => ({});
const mapDispatchToProps = dispatch => ({
    closeOrOpenConnection: (chatIsOpen) => dispatch(closeOrOpenConnection(chatIsOpen)),
    likeEntryById: (id, liked) => dispatch(likeEntryById(id, liked)),
    updateEntryById: (id, status) => dispatch(updateEntryById(id, status)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Entry);

