import React  from 'react';

import StepsForHowDoNameContestsWork from './StepsForHowDoNameContestsWork/StepsForHowDoNameContestsWork'

import { HEX_COLOR } from "../../../constants";

import { textAndLinksForHowDoNameContestsWork } from '../../../utils/textAndLinksForPages/textAndLinksForPages'

function HowDoNameContestsWork(){
    return (
        <>
            <StepsForHowDoNameContestsWork
                bgColor={HEX_COLOR.WHITE}
                dataForComponent={
                    textAndLinksForHowDoNameContestsWork["step1"]
                }>
                <h2>How Do Name Contests Work?</h2>
            </StepsForHowDoNameContestsWork>
            <StepsForHowDoNameContestsWork
                bgColor={HEX_COLOR.BLUE}
                positionOfGif={'right'}
                dataForComponent={
                    textAndLinksForHowDoNameContestsWork["step2"]
                }>
            </StepsForHowDoNameContestsWork>
            <StepsForHowDoNameContestsWork
                bgColor={HEX_COLOR.WHITE}
                dataForComponent={
                    textAndLinksForHowDoNameContestsWork["step3"]
                }>
            </StepsForHowDoNameContestsWork>
        </>
    )
}
export default HowDoNameContestsWork;
