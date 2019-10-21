import React, { useEffect, useMemo }  from 'react';
import connect from "react-redux/es/connect/connect";

import style from "./ActiveContests.module.sass"

import Contest from "../Contest/Contest";
import ActiveContestsForm from "../../Forms/ActiveContestsForm/ActiveContestsForm";

import { size } from "lodash";

import { findContestsPyParams } from "../../../actions/actionCreators/dashboardContestsActionCreator";

function ActiveContests(props){
    const { contests } = props;

    useEffect(() => {
        props.findContestsPyParams()
    }, []);

    const showFoundContests = useMemo(() => {

        if(size(contests) > 0){
            return contests.map(contest => <Contest {...contest} key={contest.id}/>)
        }else{
            return null
        }
    }, [contests]);



    return (
        <div className={style.activeContests}>

            <div className={style.header} >
                <h4>ACTIVE CONTESTS</h4>
            </div>

            <div className={style.container} >

                <ActiveContestsForm />

                <div>
                    {showFoundContests}
                </div>

            </div>

        </div>
    );
}


const mapStateToProps = (state) => ({
    contests: state.dashboardContestsReducer.contests
});
const mapDispatchToProps = dispatch => ({
    findContestsPyParams: params => dispatch(findContestsPyParams(params)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ActiveContests);
