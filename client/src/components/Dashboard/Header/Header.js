import React  from 'react';
import connect from "react-redux/es/connect/connect";

import style from './Header.module.sass'

import { closeOrOpenSideMenu } from "../../../actions/actionCreators/dashboardActionCreator";
import Avatar from "../../Avatart/Avatar";

const Header = props => {
    const { user, sideMenuIsOpen } = props;

    return (
        <div className={style.header}>
            <div className={style.button}
                 onClick={() => props.closeOrOpenSideMenu(sideMenuIsOpen)}
            >
                <i className="fas fa-list-ul"/>
            </div>
            <div className={style.userMenu}>
                <Avatar size={32} customStyle={{marginRight: "10px"}} />
                {user && <span>{user.firstName}</span>}
            </div>
        </div>
    )
};

const mapStateToProps = (state) => ({
    user: state.userReducers.user,
    sideMenuIsOpen: state.dashboardReducer.sideMenuIsOpen,
});
const mapDispatchToProps = dispatch => ({
    closeOrOpenSideMenu: (menuIsOpen) => dispatch(closeOrOpenSideMenu(menuIsOpen)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Header);