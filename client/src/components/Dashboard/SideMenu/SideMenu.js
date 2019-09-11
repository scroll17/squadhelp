import React  from 'react';
import connect from "react-redux/es/connect/connect";
import { Link } from "react-router-dom";

import Menu from './Menu/Menu'

import style from './SideMenu.module.sass'

import { URL } from "../../../api/baseURL";

import { linksForSideMenu } from '../../../utils/textAndLinksForPages/textAndLinksForPages'

const SideMenu = props => {
    const { sideMenuIsOpen } = props;

    const classForSideMenu = sideMenuIsOpen ? style.sideMenuOpen : style.sideMenu;
    const companyImage = sideMenuIsOpen ?
        "https://www.squadhelp.com/img/logo.png"
        :
        "https://www.squadhelp.com/img/SquadHelpSquareWhiteTransparentSmall.png";

    return (
        <div
            className={classForSideMenu}
        >
            <Link to={URL.HOME} className={style.companyIcon}>
                <img src={companyImage} alt={''}/>
            </Link>
            <ul className={style.menu}>
                <Menu links={linksForSideMenu}/>
            </ul>
        </div>
    )
};

const mapStateToProps = (state) => ({
    sideMenuIsOpen: state.dashboardReducer.sideMenuIsOpen,
});
export default connect(mapStateToProps)(SideMenu);