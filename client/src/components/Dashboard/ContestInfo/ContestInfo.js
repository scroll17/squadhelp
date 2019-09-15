import React, { useEffect } from 'react';
import connect from "react-redux/es/connect/connect";

import { parse } from 'query-string'

import style from './ContestInfo.module.sass'

import PrivateComponent from "../../PrivateComponent/PrivateComponent";
import StartEntry from "./StartEntry/StartEntry";
import Brief from "./Brief/Brief";


import history from "../../../boot/browserHistory";

import { getContestById } from "../../../actions/actionCreators/dashboardContestsActionCreator";
import { isEqual } from 'lodash'

import conversionObjectInformation from "../../../utils/conversionObjectInformation";
import {ROLE} from "../../../constants";

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
                                    {conversionObjectInformation(openContest, ['contestId', 'userId', 'price', 'User'])}
                                </div>

                            </div>
                        </div>

                        <PrivateComponent requireRole={[ROLE.CREATIVE]}>
                            <StartEntry typeOfContest={openContest.contestType} contestId={openContest.id}/>
                        </PrivateComponent>

                    </div>

                    <Brief contestInfo={openContest}/>
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
