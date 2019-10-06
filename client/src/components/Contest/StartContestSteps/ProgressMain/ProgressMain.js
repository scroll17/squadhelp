import React, { Fragment, useMemo } from 'react';
import connect from "react-redux/es/connect/connect";

import style from './ProgressMain.module.sass';

import { size } from 'lodash';

function ProgressMain(props){
    const { contestNow, contestQueue, caption } = props;
    const numberOfSteps = size(contestNow) + size(contestQueue);
    const progressSteps = numberOfSteps >= 3 ? numberOfSteps : 3;


    const showTheNumberOfSteps = useMemo(() => {
        const allSteps = [];
        for (let step = 1; step <= progressSteps; step++) {
            if (step < size(contestNow)) {
                allSteps.push(
                    <Fragment key={step}>
                        <div className={style.complete}>
                            <span className={style.label}>
                                <i className="fa fa-check"/>
                            </span>
                        </div>
                        <span className={style.bar}/>
                    </Fragment>
                )
            } else if (size(contestNow) === step) {
                allSteps.push(
                    <Fragment key={step}>
                        <div className={style.done}>
                            <span className={style.label}/>
                            <div className={style.tooltip}>
                                <div className={style.tooltipInner}>
                                    {step}. {caption}
                                </div>
                            </div>
                        </div>
                    </Fragment>
                )
            } else {
                allSteps.push(
                    <Fragment key={step}>
                        <span className={style.bar}/>
                        <div className={style.circle}>
                            <span className={style.label}/>
                        </div>
                    </Fragment>
                )
            }
        }
        return allSteps;
    }, [progressSteps]);

    return (
        <div className={style.progressMain}>
            <div className={style.progressBarStep} >
                {showTheNumberOfSteps}
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    contestNow: state.contestReducer.contestNow,
    contestQueue: state.contestReducer.contestQueue
});
export default connect(mapStateToProps)(ProgressMain);
