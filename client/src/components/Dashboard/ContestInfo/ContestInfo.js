import React, { useEffect } from 'react';
import connect from "react-redux/es/connect/connect";

import { parse } from 'query-string'

import style from './ContestInfo.module.sass'

import StartEntry from "./StartEntry/StartEntry";

import history from "../../../boot/browserHistory";

import { getContestById } from "../../../actions/actionCreators/dashboardContestsActionCreator";
import { isEqual } from 'lodash'

import conversionObjectInformation from "../../../utils/conversionObjectInformation";

function ContestInfo(props) {
    const { openContest } = props;

    useEffect(() => {
        const { id } = parse(history.location.search);
        const contestId = parseInt(id);

        if(!openContest || !isEqual(openContest.id, contestId)){
            props.getContestById(contestId)
        }
    }, []);


    return (
        <div className={style.contestInfo}>

            {openContest &&
                <>
                    <div className={style.aboutContestContainer}>

                        <div className={style.info}>

                            <div className={style.container}>

                                <div className={style.aboutContest}>
                                    <img src="https://www.squadhelp.com/images/entry-not-icon.png"
                                         className={style.image}
                                         alt={'contest'}
                                    />
                                    About This Contest
                                </div>

                                <div className={style.content}>
                                    {conversionObjectInformation(openContest, ['contestId', 'userId', 'price'])}
                                </div>

                            </div>
                        </div>

                        <StartEntry typeOfContest={openContest.contestType}/>

                    </div>


                    <div className={style.statusStatusContainer}>
                        <div className={style.contestStatus}>
                            <h1><i className="far fa-gem" aria-hidden="true"></i>$33</h1>
                            <div className="ContestStat_container__2iOPr">
                                <div className="ContestStat_entries__2E7MF"><span>
                                    <i className="fa fa-user" aria-hidden="true"></i> 0</span>
                                    <p>Entries</p></div>
                                <div className="ContestStat_timeLeft__1EaAo"><span>13 d.,23 h.</span><p>Left</p></div>
                            </div>
                            <p>Posted in 6 minutes<h1><i className="far fa-gem" aria-hidden="true"></i>$33</h1></p>
                        </div>
                    </div>

                </>

            }

        </div>
    )
}
const mapStateToProps = (state) => ({
    openContest: state.dashboardContestsReducer.openContest,
});
const mapDispatchToProps = dispatch => ({
    getContestById: (id) => dispatch(getContestById(id)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ContestInfo);
