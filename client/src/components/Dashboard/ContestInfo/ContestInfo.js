import React, { useEffect } from 'react';
import connect from "react-redux/es/connect/connect";

import { parse } from 'query-string'

import style from './ContestInfo.module.sass'

import history from "../../../boot/browserHistory";

import { getContestById } from "../../../actions/actionCreators/dashboardActionCreator";
import { isEqual } from 'lodash'

import conversionObjectInformation from "../../../utils/conversionObjectInformation";

function ContestInfo(props) {
    const { openContest } = props;

    useEffect(() => {
        const { id } = parse(history.location.search);
        const contestId = parseInt(id);

        if(!openContest || !isEqual(openContest.id, contestId)){
            console.log('ZAPIT')
            props.getContestById(contestId)
        }
    }, []);


    return (
        <div className={style.contestInfo}>
            <div className={style.container}>
                <div className={style.info}>
                    <div className={style.container}>
                        <div className={style.aboutContest}>
                            <img src="https://www.squadhelp.com/images/entry-not-icon.png" className={style.image} alt={'contest'}/>
                            About This Contest
                        </div>
                        <div className={style.content}>
                            {openContest && conversionObjectInformation(openContest, ['contestId', 'userId', 'price'])}
                        </div>
                    </div>
                </div>
            </div>
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
