import React, { useMemo } from 'react';
import style from './СontestTypes.module.sass';

import ItemContestType from '../ItemContestType/ItemContestType'
import Heading from '../Heading/Heading'

import { HEX_COLOR } from "../../../constants";

function ContestTypes(props) {
    const {heading, itemsContestType} = props.textAndLinks;

    const showItemsContestTypes = useMemo(() => {
        return itemsContestType.map(contest => (
            <li key={contest.name}>
                <ItemContestType {...contest} bgColor={props.itemBgColor}/>
            </li>
        ))
    },[itemsContestType]);

    return (
        <div className={style.contentType} style={{background: props.bgColor}}>
            <div className={style.container}>
                <div className={style.row}>

                    <Heading
                        color={props.headingColor}
                        borderColor={props.borderColor}
                        {...heading}
                    >
                        {heading.text}
                    </Heading>

                    <div className={style.categories}>
                        <ul className={style.listContestType}>
                            {showItemsContestTypes}
                        </ul>
                    </div>

                </div>
            </div>
        </div>
    )
}

ContestTypes.defaultProps = {
    headingColor: HEX_COLOR.GRAY_20,
    borderColor: HEX_COLOR.BLUE,
    bgColor: HEX_COLOR.WHITE,
};
export default ContestTypes;

