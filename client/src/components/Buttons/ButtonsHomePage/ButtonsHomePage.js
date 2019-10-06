import React  from 'react';
import { Link } from "react-router-dom";

import style from './ButtonsHomePage.module.sass';

function ButtonsHomePage(props){
    return (
        <div className={style.startContest}>
            <Link to={props.link}>{props.children}</Link>
        </div>
    )
}
export default React.memo(ButtonsHomePage);
