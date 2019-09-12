import React, { useEffect } from 'react';
import connect from "react-redux/es/connect/connect";

import StatusOfContest from "./StatusOfContest/StatusOfContest";
import Contest from "../Contest/Contest";
import Profile from '../Profile/Profile'

import { getUserContests } from "../../../actions/actionCreators/dashboardActionCreator";
import style from "./MyAccount.module.sass";

import { size, isEmpty } from 'lodash'

function MyAccount(props) {
    const { myContests } = props;

    useEffect(() => {
        if(isEmpty(myContests)){
            props.getUserContests()
        }
    }, []);

    const showMyContests = contests => {
        return contests.map(contest => <Contest {...contest} key={contest.id}/>)
    };

    return (
            <div className={style.container} >
                <StatusOfContest count={size(myContests)}/>
                <div className={style.myProfile}>
                    <div className={style.myContests}>
                        <div className={style.title}>my contests</div>
                        <div className={style.listBox}>
                            {showMyContests(myContests)}
                        </div>
                    </div>
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
const mapDispatchToProps = dispatch => ({
    getUserContests: () => dispatch(getUserContests()),
});
export default connect( mapStateToProps, mapDispatchToProps )(MyAccount);

