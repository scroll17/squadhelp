import React from 'react';
import style from './Heading.module.sass';

function Heading(props){
    return (
        <div className={style.textCategories}>
            <div className={style.heading} style={{color: props.color}}>
                <h3>
                    {props.headerText}
                    <b> {props.headerBoard}</b>
                </h3>
                <p>
                    {props.children}
                </p>
                <hr style={{borderColor: props.borderColor}}/>
            </div>
        </div>
    )
}
export default Heading;

