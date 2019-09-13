import React  from 'react';
import { Route, Switch } from "react-router-dom";
import connect from "react-redux/es/connect/connect";
import style from './DashboardPage.module.sass'


import Header from "../../components/Dashboard/Header/Header";
import SideMenu from "../../components/Dashboard/SideMenu/SideMenu";

import MyAccount  from '../../components/Dashboard/MyAccount/MyAccount'
import ContestInfo from "../../components/Dashboard/ContestInfo/ContestInfo";


import {closeOrOpenSideMenu} from "../../actions/actionCreators/dashboardContestsActionCreator";
import { URL } from "../../api/baseURL";

import historyLocationPath from "../../utils/history/historyLocationPath";


function DashboardPage(props) {
    const styleForOpenMenu = props.sideMenuIsOpen ? {marginLeft: "250px"} : null;
    return (
        <div className={style.dashboard}>

            <SideMenu/>

            <div className={style.content} style={styleForOpenMenu}>
                <Header/>

                    <Switch>

                        <Route
                            path={historyLocationPath([URL.CONTEST], URL.DASHBOARD)}
                            render={props => <ContestInfo {...props}/>}
                        />

                        <Route
                            path={historyLocationPath([URL.MY_ACCOUNT], URL.DASHBOARD)}
                            render={props => <MyAccount {...props}/>}
                        />


                    </Switch>
            </div>
        </div>
    )
}
const mapStateToProps = (state) => ({
    sideMenuIsOpen: state.dashboardReducer.sideMenuIsOpen,
});
const mapDispatchToProps = dispatch => ({
    closeOrOpenSideMenu: (menuIsOpen) => dispatch(closeOrOpenSideMenu(menuIsOpen)),
});
export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);
