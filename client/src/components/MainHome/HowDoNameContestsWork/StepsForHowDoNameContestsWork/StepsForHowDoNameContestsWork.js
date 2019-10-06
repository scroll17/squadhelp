import React, { useMemo }  from 'react';
import style from './StepsForHowDoNameContestsWork.module.sass';

import { HEX_COLOR } from "../../../../constants";

function StepsForHowDoNameContestsWork(props ){

    const { dataForComponent, bgColor, positionOfGif } = props;

    let backgroundColor;
    let textPositionNearTheGif = positionOfGif ?
        `${style.blockWithInformation} ${style.informationReverse}`
        :
        style.blockWithInformation;

    if(positionOfGif === "right"){
        backgroundColor = {backgroundColor: bgColor, color: HEX_COLOR.WHITE};
    }else{
        backgroundColor = {backgroundColor: bgColor};
    }

    const liItems = useMemo(() => {
        return dataForComponent.steps.map( step => (<li key={step}>
            <i className="fas fa-check" style={backgroundColor}/>
            <span>{step}</span>
        </li>));
    }, [dataForComponent.steps]);

    return (
        <div className={style.StepsForHowDoNameContestsWork} style={backgroundColor}>
            <div className={style.container}>
                <div className={style.row}>
                    <div className={style.title}>{props.children}</div>
                    <div className={textPositionNearTheGif}>
                        <div className={style.box}>
                            <h4>{dataForComponent.title}</h4>
                            <ul>
                                {liItems}
                            </ul>
                        </div>
                        <img className={style.gif} src={dataForComponent.src} alt={''}/>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default StepsForHowDoNameContestsWork;

