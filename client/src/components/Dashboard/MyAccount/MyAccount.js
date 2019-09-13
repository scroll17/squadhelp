import React  from 'react';
import connect from "react-redux/es/connect/connect";

import StatusOfContest from "./StatusOfContest/StatusOfContest";
import MyContests from "./MyContests/MyContests";
import Profile from '../Profile/Profile'

import PrivateComponent from "../../PrivateComponent/PrivateComponent";

import style from "./MyAccount.module.sass";

import { size } from 'lodash'

import { ROLE } from "../../../constants";

function MyAccount(props) {
    const { myContests } = props;


    return (
            <div className={style.container} >

                <PrivateComponent requireRole={[ROLE.BUYER]}>
                    <StatusOfContest count={size(myContests)}/>
                </PrivateComponent>

                <div className={style.myProfile}>

                    <PrivateComponent requireRole={[ROLE.BUYER]}>
                        <MyContests />
                    </PrivateComponent>

                    <div>
                        <Profile />
                    </div>

                </div>
            </div>

    )
}

const mapStateToProps = (state) => ({
    myContests: state.dashboardContestsReducer.myContests
});
export default connect( mapStateToProps )(MyAccount);

