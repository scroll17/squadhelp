import React from 'react';
import { Link } from "react-router-dom";

import style from './HeaderLoginAndSignUp.module.sass';
import {URL} from "../../api/baseURL";

function HeaderLoginAndSignUp(props) {
    const link = props.children;
    return (
        <div className={style.header}>
            <Link to={URL.HOME}>
                <div className={style.logo} />
            </Link>
            <div className={style.loginBottom}>
                <Link to={`/${link.toLowerCase()}`} replace>
                    {link}
                </Link>
            </div>
        </div>
    )
}
export default React.memo(HeaderLoginAndSignUp);
