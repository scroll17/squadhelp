import React, { useEffect, useState } from 'react';
import connect from "react-redux/es/connect/connect";

import { parse } from 'query-string'

import style from './ContestInfo.module.sass'

import PrivateComponent from "../../PrivateComponent/PrivateComponent";
import StartEntry from "./StartEntry/StartEntry";
import Brief from "./Brief/Brief";
import Entry from "./Entry/Entry";


import history from "../../../boot/browserHistory";

import { getContestById } from "../../../actions/actionCreators/dashboardContestsActionCreator";
import { isEqual, pick } from 'lodash'

import conversionObjectInformation from "../../../utils/conversionObjectInformation";
import {ROLE, CONTEST_STATUS, CONTEST_FIELDS} from "../../../constants";
import DrawContestForm from "../../Forms/ContestForms/DrawContestForm/DrawContestForm";

function ContestInfo(props) {
    const { openContest } = props;
    const {
        STATUS,
        PRICE,
        CONTEST_ID,
        ENTRIES,
        NUMBER_OF_ENTRY,
        USER,
        USER_ID,
        TITLE,
        TYPE_OF_VENTURE,
        WHAT_VENTURE_DOES,
        TARGET_CUSTOMERS,
        FILE,
        TYPE,
        NAME,
        STYLE
    } = CONTEST_FIELDS;

    const [updateContest, setUpdateContest] = useState(false);

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
                                    <p>
                                        <img src="https://www.squadhelp.com/images/entry-not-icon.png"
                                             className={style.image}
                                             alt={'contest'}
                                        />
                                        About This Contest
                                    </p>
                                    <PrivateComponent
                                        requireRole={[ROLE.BUYER]}
                                        desiredOptions={openContest.status !== CONTEST_STATUS.CLOSED}  /*TODO === CONTEST_STATUS.AWAITING*/
                                    >
                                        <i
                                            className="fas fa-edit"
                                            onClick={() => setUpdateContest(updateContest => !updateContest)}
                                        />
                                    </PrivateComponent>
                                </div>


                                {updateContest ?
                                    <div className={style.updateContests}>
                                        <DrawContestForm
                                            contestStageNow={openContest.contestType}
                                            form={openContest.contestType}
                                            initialValues={pick(openContest, [
                                                TITLE, TYPE_OF_VENTURE, WHAT_VENTURE_DOES,
                                                TARGET_CUSTOMERS, FILE, TYPE, NAME, STYLE
                                            ])}
                                        />
                                    </div>
                                    :
                                    <div className={style.content}>
                                        {conversionObjectInformation(
                                            openContest,
                                            [STATUS, PRICE, CONTEST_ID, ENTRIES, NUMBER_OF_ENTRY, USER, USER_ID]
                                        )}
                                    </div>
                                }
                            </div>
                        </div>

                        <PrivateComponent requireRole={[ROLE.BUYER]} desiredOptions={!updateContest}>
                            <div className={style.entries}>
                                <div className={style.title}>Entries</div>
                                <div className={style.list}>
                                    {
                                        openContest.Entries &&
                                        openContest.Entries.map(entry => <Entry {...entry} key={entry.id}/>)
                                    }
                                </div>
                            </div>
                        </PrivateComponent>

                        <PrivateComponent
                            requireRole={[ROLE.CREATIVE]}
                            desiredOptions={isEqual(openContest.status, CONTEST_STATUS.OPEN)}
                        >
                            <StartEntry typeOfContest={openContest.contestType} contestId={openContest.id}/>
                        </PrivateComponent>
                    </div>

                    <Brief
                        contestInfo={openContest}
                        updateContest={updateContest}
                    />
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
