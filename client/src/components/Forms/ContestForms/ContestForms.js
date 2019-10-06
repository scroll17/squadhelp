import React, {useEffect} from 'react';
import connect from "react-redux/es/connect/connect";

import style from './ContestForms.module.sass';

import ReactModal from '../../ReactModal/ReactModal'

import DrawContestForm from './DrawContestForm/DrawContestForm'
import RemoteSubmitButton from '../../Buttons/RemoteSubmitButton/RemoteSubmitButton'
import BankForm from '../BankForm/BankForm'

import {
    createContest,
    prevContestStage,
    nextContestStage,
    getPriceOfContests
} from "../../../actions/actionCreators/contestActionCreator"

import { last, isEmpty, omit } from 'lodash';

import { CONTEST, TYPE_FIELD, CONTEST_REDUCER_VAL } from "../../../constants";

function ContestForms(props){
    const { contestNow, contestQueue, contestFormData} = props;
    const { CONTEST_FORM_DATA, CONTEST_NOW, CONTEST_QUEUE } = CONTEST_REDUCER_VAL;

    useEffect(() => {
        props.getPriceOfContests()
    },[]);

    useEffect(() => {
        const formDataToSave = omit(contestFormData, CONTEST.BANKS);

        Object.keys(formDataToSave).forEach( stage => {
            formDataToSave[stage] = omit(formDataToSave[stage], TYPE_FIELD.INPUT_FILE);
        });
        sessionStorage.setItem(CONTEST_FORM_DATA, JSON.stringify(formDataToSave));

        sessionStorage.setItem(CONTEST_NOW, JSON.stringify(contestNow));
        sessionStorage.setItem(CONTEST_QUEUE, JSON.stringify(contestQueue));
    });


    const nowFormContest = last(contestNow);
    const styleForBankFor = nowFormContest === CONTEST.BANKS ? {margin: "0 auto", width: "100%"} : {};

    const createNewContest = (values) => {
        if(isEmpty(props.contestQueue)){
            return props.createNewContest(values)
        }else{
            return props.nextContestForm(values)
        }
    };

    const backToPrevStage = () => {
        return props.backToPrevStage()
    };

        return (
            <>
                {!props.user && nowFormContest === CONTEST.BANKS && <ReactModal />}

                <div className={style.stepsForm}>
                    <div className={style.container} style={styleForBankFor}>
                        <div className={style.row}>
                            <div className={style.blockFields} style={styleForBankFor}>


                                {nowFormContest === CONTEST.NAME && (
                                    <DrawContestForm
                                        onSubmit={createNewContest}
                                        form={CONTEST.NAME}
                                    />)}

                                {nowFormContest === CONTEST.LOGO && (
                                    <DrawContestForm
                                        onSubmit={createNewContest}
                                        form={CONTEST.LOGO}
                                    />)}

                                {nowFormContest === CONTEST.TAGLINE && (
                                    <DrawContestForm
                                        onSubmit={createNewContest}
                                        form={CONTEST.TAGLINE}
                                    />)}

                                {nowFormContest === CONTEST.BANKS && (
                                    <BankForm
                                        onSubmit={createNewContest}
                                        form={CONTEST.BANKS}
                                    />)}

                            </div>
                        </div>
                    </div>


                    {nowFormContest !== CONTEST.SELECT && (
                        <div className={style.nextSteps}>
                            <div className={style.containerSteps}>
                                <div className={style.stepsText}>
                                    <p>You are almost finished. Select a pricing package in the next step</p>
                                </div>

                                <div className={style.stepsNavigation}>
                                    <div onClick={backToPrevStage} className={style.divBack}>
                                        Back
                                    </div>
                                    <RemoteSubmitButton />
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </>
        );
}

const mapStateToProps = (state) => ({
    contestNow: state.contestReducer.contestNow,
    contestQueue: state.contestReducer.contestQueue,
    contestFormData: state.contestReducer.contestFormData,

    user: state.userReducer.user
});
const mapDispatchToProps = dispatch => ({
    createNewContest: contest => dispatch(createContest(contest)),
    backToPrevStage: () => dispatch(prevContestStage()),
    nextContestForm: (contest) => dispatch(nextContestStage(contest)),
    getPriceOfContests: () => dispatch(getPriceOfContests()),
});
export default connect(mapStateToProps, mapDispatchToProps)(ContestForms);