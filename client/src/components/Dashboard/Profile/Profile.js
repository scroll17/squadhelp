import React from 'react';
import connect from "react-redux/es/connect/connect";


import style from './Profile.module.sass'


import {getContestById} from "../../../actions/actionCreators/dashboardContestsActionCreator";

import conversionObjectInformation from "../../../utils/conversionObjectInformation";
import Avatar from "../../Avatart/Avatar";

function ContestInfo(props) {
    const {user} = props;

    return (
        <div className={style.profile}>
            <h1 className={style.title}>Profile</h1>

            <Avatar size={120} customStyle={{margin: "0 auto"}}/>

            <div className={style.info}>
                {conversionObjectInformation(user, ['avatar', 'isBanned'])}
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    user: state.userReducer.user
});
const mapDispatchToProps = dispatch => ({
    getContestById: (id) => dispatch(getContestById(id)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ContestInfo);
