import React, { useEffect, useState } from 'react';
import connect from "react-redux/es/connect/connect";

import { toast } from 'react-toastify';

import { parse } from 'query-string'

import style from './ContestInfo.module.sass'

import PrivateComponent from "../../PrivateComponent/PrivateComponent";
import StartEntry from "./StartEntry/StartEntry";
import Brief from "./Brief/Brief";
import Entry from "./Entry/Entry";


import history from "../../../boot/browserHistory";

import { getContestById, updateContest } from "../../../actions/actionCreators/dashboardContestsActionCreator";
import { isEqual, isEqualWith, pick, isNull, isUndefined } from 'lodash'

import conversionObjectInformation from "../../../utils/conversionObjectInformation";
import {ROLE, CONTEST_STATUS, CONTEST_FIELDS, CONTEST_FIELDS_TO_UPDATE} from "../../../constants";
import DrawContestForm from "../../Forms/ContestForms/DrawContestForm/DrawContestForm";
import convertSelectInputToNormalObject from "../../../utils/forms/convertSelectInputToNormalObject";



function ContestInfo(props) {
    const { openContest, userId } = props;
    const {
        STATUS,
        PRICE,
        CONTEST_ID,
        ENTRIES,
        NUMBER_OF_ENTRY,
        USER,
        USER_ID
    } = CONTEST_FIELDS;

    const [updateContest, setUpdateContest] = useState(false);


    useEffect(() => {
        const { id } = parse(history.location.search);
        const contestId = parseInt(id);

        if(!openContest || !isEqual(openContest.id, contestId)){
            props.getContestById(contestId)
        }
    }, []);

    const updateContests = (value) => {
        const newValue = convertSelectInputToNormalObject(value);
        const oldValue = pick(openContest, CONTEST_FIELDS_TO_UPDATE);

        console.log("newValue", newValue);

        // const customizer = (valueOne, valueTwo) => {
        //     if (isNull(valueOne) && isUndefined(valueTwo)) {
        //         return true;
        //     }
        // };
        //
        // if(isEqualWith(oldValue, newValue, customizer)){
        //     toast.info("Nothing to update", {
        //         position: toast.POSITION.TOP_RIGHT
        //     });
        // }else{
        //     props.updateContest(newValue, openContest.id);
        //     return setUpdateContest(false);
        // }
    };

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
                                        desiredOptions={
                                            openContest.userId === userId
                                            &&
                                            openContest.status === CONTEST_STATUS.AWAITING
                                        }
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
                                            onSubmit={updateContests}
                                            contestStageNow={openContest.contestType}
                                            form={`update_${openContest.contestType}`}
                                            initialValues={pick(openContest, CONTEST_FIELDS_TO_UPDATE)}
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

                        <PrivateComponent requireRole={[ROLE.BUYER]} desiredOptions={!updateContest && openContest.userId === userId}>
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
    userId: state.userReducer.user.id,
});
const mapDispatchToProps = dispatch => ({
    getContestById: (id) => dispatch(getContestById(id)),
    updateContest: (fieldsData, contestId) => dispatch(updateContest(fieldsData, contestId)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ContestInfo);
