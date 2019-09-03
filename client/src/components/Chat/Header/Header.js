import React from 'react';
import style from './Header.module.sass'

import connect from "react-redux/es/connect/connect";

import { setSearchUsers } from "../../../actions/actionCreator";
import {socket} from "../../../api/socket/chatController";

function Header(props){
    const { resetField, isSearchUsers, setSearchUsers, ...input } = props;

    const findUsers = (e) => {
        const value = e.target.value;
        socket.emit('find users', { data: value });
    };

    return(
        <div className={style.findUsers}>
            <div className={style.navBar}>
                <div className={style.company}>
                    <i className="fab fa-telegram" />
                    <span className={style.companyName}>Telegram</span>
                </div>
                <div className={style.tools}>
                    <i className="fas fa-search" onClick={() => setSearchUsers(!isSearchUsers)}/>
                    <i className="fas fa-bars" />
                </div>
            </div>
            {isSearchUsers &&
                <div className={style.searchContainer}>
                    <div className={style.search}>
                        <i className="fas fa-search" />
                        <input {...input} onChange={findUsers} />
                        <i className="far fa-times-circle" />
                    </div>
                </div>
            }
        </div>
    )
}

const mapStateToProps = (state) => ({
    isSearchUsers: state.chatReducers.isSearchUsers,
});
const mapDispatchToProps = dispatch => ({
    setSearchUsers: (isSearch) => dispatch(setSearchUsers(isSearch)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Header);

