import React, {useEffect} from 'react';
import connect from "react-redux/es/connect/connect";

import Contest from "../../Contest/Contest";

import {getUserContests} from "../../../../actions/actionCreators/dashboardContestsActionCreator";
import style from "./MyContests.module.sass";


function MyContests(props) {
    const {myContests} = props;

    useEffect(() => {
        props.getUserContests()
    }, []);

    const showMyContests = contests => {
        return contests.map(contest => <Contest {...contest} key={contest.id}/>)
    };

    return (
        <div className={style.myContests}>
            <div className={style.title}>my contests</div>
            <div className={style.listBox}>
                {showMyContests(myContests)}
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
export default connect(mapStateToProps, mapDispatchToProps)(MyContests);

