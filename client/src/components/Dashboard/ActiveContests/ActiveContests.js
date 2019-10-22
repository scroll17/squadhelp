import React, { useMemo }  from 'react';
import connect from "react-redux/es/connect/connect";

import style from "./ActiveContests.module.sass"

import Contest from "../Contest/Contest";
import ActiveContestsForm from "../../Forms/ActiveContestsForm/ActiveContestsForm";

import { size } from "lodash";


function ActiveContests(props){
    const { contests } = props;

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
                <div className={style.activeContestForm}>
                    <ActiveContestsForm />
                </div>

                <div className={style.contestList}>
                    {showFoundContests}
                </div>
            </div>
        </div>
    );
}


const mapStateToProps = (state) => ({
    contests: state.dashboardContestsReducer.contests
});
export default connect(mapStateToProps)(ActiveContests);
