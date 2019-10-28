import React  from 'react';
import {Link} from "react-router-dom";

import style from './LoginSignUp.module.sass';

import { URL } from '../../../../api/baseURL'

function LoginSignUp(){
    return (
        <div className={style.loginSignUp}>
            <div className={style.row}>
                <span>
                    <Link to={URL.LOGIN}>Login</Link>
                </span>
                <span>
                    <Link to={URL.SIGN_UP}>Sign Up</Link>
                </span>
            </div>
        </div>
    )
}
export default LoginSignUp;
