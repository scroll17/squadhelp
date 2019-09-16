import React from 'react';
import connect from "react-redux/es/connect/connect";

import style from './StartContestSteps.module.sass';

import ProgressMain from './ProgressMain/ProgressMain'

import { textForStartContestSteps  } from '../../../utils/textAndLinksForPages/textAndLinksForPages'

import { last } from 'lodash';

function StartContestSteps(props){
    const { contestNow } = props;

    const nowStage = last(contestNow);
    const textForStage = textForStartContestSteps.find( item => item.page === nowStage);

    return (
        <div className={style.startContestSteps}>
            <div className={style.container}>
                <div className={style.row}>

                    <div className={style.headingSteps}>
                        <h2 className={style.text}>{textForStage.title}</h2>
                        <p>
                            {textForStage.description}
                        </p>
                    </div>

                    <ProgressMain
                        caption={textForStage.caption}
                        numberOfStages={contestNow}
                    />

                </div>
            </div>
        </div>
    )

}

const mapStateToProps = (state) => ({
    contestNow: state.contestReducer.contestNow,
});
export default connect(mapStateToProps)(StartContestSteps);


