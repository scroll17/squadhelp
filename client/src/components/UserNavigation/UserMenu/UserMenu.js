import React , { useState, useEffect, useRef } from 'react';
import connect from "react-redux/es/connect/connect";
import {Link} from "react-router-dom";

import style from './UserMenu.module.sass';

import { userLogout } from "../../../actions/actionCreator";

import { URL } from '../../../api/baseURL'
import { ROLE, DISPLAY, VIEW } from '../../../constants'

function UserNavigationSmartphone(props){
    const [displayStyle, setDisplayStyle] = useState(DISPLAY.NONE);
    const toggleContainer = useRef(null);

    const toOpenMenu = () => {
        const nextDisplayStyle = displayStyle === DISPLAY.NONE ? DISPLAY.BLOCK : DISPLAY.NONE;
        setDisplayStyle(nextDisplayStyle);
    };

    const onClickOutsideHandler = (event) => {
        if (displayStyle === DISPLAY.BLOCK && !toggleContainer.current.contains(event.target)) {
            setDisplayStyle(DISPLAY.NONE)
        }
    };


    useEffect(() => {
        window.addEventListener('click', onClickOutsideHandler);
        return () => window.removeEventListener('click', onClickOutsideHandler);
    });


    const adminPanel = props.user.role === ROLE.ADMIN ?
                <Link to={URL.ADMIN_PANEL} style={{color: "#3ea9f5"}}><li>Admin panel</li></Link>
                : null;

    return (
        <div className={style.userMenu}>
            <div className={style.row}>
                    <div className={style.informUser}
                         onMouseDown={(e) => {e.preventDefault()}}
                         onClick={toOpenMenu}
                         ref={toggleContainer}
                    >
                        <div className={style.iconUser} />
                        { props.view === VIEW.DESKTOP && `Hi, ${props.user.firstName}` }
                        <i className="fas fa-angle-down" />
                    </div>

                {displayStyle === DISPLAY.BLOCK &&
                    <ul className={style.dropdownMenu} >
                        <Link to={URL.DASHBOARD}><li> View Dashboard </li></Link>
                        <Link to={URL.MY_ACCOUNT}><li> My Account </li></Link>
                        <Link to={URL.MESSAGE}><li> Messages </li></Link>
                        <Link to={URL.AFFILIATE_DASHBOARD}> <li> Affiliate Dashboard </li></Link>
                        {adminPanel}
                        <span  onClick={props.clickToLogout}><li>Logout</li></span>
                    </ul>
                }

                { props.view === VIEW.DESKTOP &&
                    <Link to={URL.MESSAGE} className={style.message} >
                        <i className="far fa-envelope" />
                    </Link>
                }
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    user: state.userReducers.user
});
const mapDispatchToProps = dispatch => ({
    clickToLogout: () => dispatch(userLogout()),
});
export default connect(mapStateToProps, mapDispatchToProps)(UserNavigationSmartphone);

