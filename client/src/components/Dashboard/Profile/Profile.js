import React, { useRef, useState } from 'react';
import connect from "react-redux/es/connect/connect";

import style from './Profile.module.sass'

import {getContestById} from "../../../actions/actionCreators/dashboardContestsActionCreator";
import { updateUserAvatar } from "../../../actions/actionCreators/userActionCreator";

import conversionObjectInformation from "../../../utils/conversionObjectInformation";

import Avatar from "../../Avatart/Avatar";
import UpdateUserForm from "../../Forms/UpdateUserForm/UpdateUserForm";

import { USER_DATA_FIELDS } from "../../../constants";

function ContestInfo(props) {
    const { user } = props;
    const { IS_BANNED, AVATAR, BALANCE } = USER_DATA_FIELDS;

    const [ editing, setEditing] = useState(false);

    const refInput = useRef(null);

    const updateUserAvatar = () => {
        props.updateUserAvatar(refInput.current.files[0])
    };

    return (
        <div className={style.profile}>
            <div className={style.header}>
                <h1>Profile</h1>
                <i
                    onClick={() => setEditing(editing => !editing)}
                    className="fas fa-pencil-alt"
                />
            </div>

            { editing ?
                <UpdateUserForm
                    closeEditing={() => setEditing(false)}
                />
                :
                <>
                    <Avatar size={120} customStyle={{margin: "0 auto"}}>
                        <input
                            ref={refInput}
                            type={"file"}
                            accept="image/*"
                            onChange={updateUserAvatar}
                        />
                    </Avatar>

                    <div className={style.info}>
                        {conversionObjectInformation(user, [IS_BANNED, AVATAR, BALANCE])}
                    </div>
                </>
            }
        </div>
    )
}

const mapStateToProps = (state) => ({
    user: state.userReducer.user
});
const mapDispatchToProps = dispatch => ({
    getContestById: (id) => dispatch(getContestById(id)),
    updateUserAvatar: (avatar) => dispatch(updateUserAvatar(avatar)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ContestInfo);
