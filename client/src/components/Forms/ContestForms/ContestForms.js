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

import { CONTEST } from "../../../constants";

function ContestForms(props){
    const { contestNow, contestQueue, contestFormData} = props;

    useEffect(() => {
        props.getPriceOfContests()
    },[]);

    useEffect(() => {
        const formDataToSave = omit(contestFormData, CONTEST.BANKS);

        Object.keys(formDataToSave).forEach( stage => {
            formDataToSave[stage] = omit(formDataToSave[stage], 'file');
        });
        sessionStorage.setItem('contestFormData', JSON.stringify(formDataToSave));

        sessionStorage.setItem('contestNow', JSON.stringify(contestNow));
        sessionStorage.setItem('contestQueue', JSON.stringify(contestQueue));
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
                                    <div onClick={() => backToPrevStage()} className={style.divBack}>
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
    contestNow: state.contestReducers.contestNow,
    contestQueue: state.contestReducers.contestQueue,
    contestFormData: state.contestReducers.contestFormData,

    user: state.userReducers.user
});
const mapDispatchToProps = dispatch => ({
    createNewContest: contest => dispatch(createContest(contest)),
    backToPrevStage: () => dispatch(prevContestStage()),
    nextContestForm: (contest) => dispatch(nextContestStage(contest)),
    getPriceOfContests: () => dispatch(getPriceOfContests()),
});
export default connect(mapStateToProps, mapDispatchToProps)(ContestForms);