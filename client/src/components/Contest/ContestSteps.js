import React from 'react';

import ContestTypes from './СontestTypes/СontestTypes'

import {
    ContestPopularCategories,
    ContestOtherCategories,
    ContestBundlePackages }  from '../../utils/textAndLinksForPages/textAndLinksForPages'

import { HEX_COLOR } from "../../constants";

function ContestSteps(){
        const style = {
           headingColor: HEX_COLOR.WHITE,
           borderColor: HEX_COLOR.WHITE,
           bgColor: HEX_COLOR.BLUE,
           itemBgColor: HEX_COLOR.WHITE,
        };

        return (
            <section>
                <ContestTypes
                    {...style}
                    textAndLinks={ContestPopularCategories}
                />
                <ContestTypes
                    textAndLinks={ContestBundlePackages}
                />
                <ContestTypes
                    textAndLinks={ContestOtherCategories}
                />
            </section>
        )
}
export default ContestSteps;

