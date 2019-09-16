import React from 'react';
import connect from "react-redux/es/connect/connect";


import style from "./Entry.module.sass";

import Avatar from "../../../Avatart/Avatar";
import statusInIcon from "../../../../utils/statusInIcon";

import {startConversation} from "../../../../api/socket/chatController";
import {closeOrOpenConnection} from "../../../../actions/actionCreators/chatActionCreator";

import createFilePathAndName from "../../../../utils/createFilePathAndName";
import { ENTRY_USER_FILE } from "../../../../constants";

function Entry(props) {
    const {User, text, file, status, id, isValid, isModerationPage} = props;
    const {displayName, avatar} = User;

    const styleForModerationPage = {
        display: "flex",
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%'
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
                        <i className="fas fa-heart"/>
                        <div>
                            <span>
                                choose as a winner
                            </span>
                            <span>
                                reject
                            </span>
                        </div>
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
});
export default connect(mapStateToProps, mapDispatchToProps)(Entry);

