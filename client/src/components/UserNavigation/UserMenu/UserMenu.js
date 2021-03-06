import React , { useRef } from 'react';
import connect from "react-redux/es/connect/connect";
import {Link} from "react-router-dom";

import style from './UserMenu.module.sass';

import Avatar from "../../Avatart/Avatar";

import { userLogout } from "../../../actions/actionCreators/userActionCreator";

import { URL } from '../../../api/baseURL'
import { ROLE, DISPLAY, VIEW, HEX_COLOR } from '../../../constants'
import {closeOrOpenConnection} from "../../../actions/actionCreators/chatActionCreator";

import { useMissClick } from '../../Hooks/useMissClick'

function UserNavigationSmartphone(props){
    const toggleContainer = useRef(null);
    const [displayStyle, toOpenMenu] = useMissClick(toggleContainer);


    const adminLinks = props.user.role === ROLE.ADMIN ?
        (
            <>
                <Link to={URL.ADMIN_PANEL} style={{color: HEX_COLOR.BLUE}}>
                    <li>Admin panel</li>
                </Link>
                <Link to={URL.MODERATION} style={{color: HEX_COLOR.BLUE}}>
                    <li>Moderation</li>
                </Link>
            </>
        )
        : null;

    return (
        <div className={style.userMenu}>
            <div className={style.row}>
                    <div className={style.informUser}
                         onMouseDown={(e) => {e.preventDefault()}}
                         onClick={toOpenMenu}
                         ref={toggleContainer}
                    >
                        <Avatar customStyle={{marginRight: "5px"}} />
                        { props.view === VIEW.DESKTOP && `Hi, ${props.user.firstName}` }
                        <i className="fas fa-angle-down" />
                    </div>

                {displayStyle === DISPLAY.BLOCK &&
                    <ul className={style.dropdownMenu} >
                        <Link to={`${URL.DASHBOARD}${URL.MY_ACCOUNT}`}><li> View Dashboard </li></Link>
                        <span onClick={() => props.closeOrOpenConnection(props.chatIsOpen)}>
                            <li> Messages </li>
                        </span>
                        {adminLinks}
                        <span onClick={props.clickToLogout}><li>Logout</li></span>
                    </ul>
                }

                { props.view === VIEW.DESKTOP &&
                    <span onClick={() => props.closeOrOpenConnection(props.chatIsOpen)}
                          className={style.message}
                    >
                             <i className="far fa-envelope" />
                    </span>
                }
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    chatIsOpen: state.chatReducer.isOpen,
    user: state.userReducer.user
});
const mapDispatchToProps = dispatch => ({
    clickToLogout: () => dispatch(userLogout()),
    closeOrOpenConnection: (chatIsOpen) => dispatch(closeOrOpenConnection(chatIsOpen)),
});
export default connect(mapStateToProps, mapDispatchToProps)(UserNavigationSmartphone);

