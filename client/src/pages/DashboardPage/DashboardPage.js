import React  from 'react';
import { Route, Switch } from "react-router-dom";
import connect from "react-redux/es/connect/connect";
import style from './DashboardPage.module.sass'


import Header from "../../components/Dashboard/Header/Header";
import SideMenu from "../../components/Dashboard/SideMenu/SideMenu";

import MyDashboard  from '../../components/Dashboard/MyDashboard/MyDashboard'
import ContestInfo from "../../components/Dashboard/ContestInfo/ContestInfo";

import Profile from "../../components/Dashboard/Profile/Profile";
import Balance from "../../components/Dashboard/Balance/Balance";

import ActiveContests from "../../components/Dashboard/ActiveContests/ActiveContests";

import {closeOrOpenSideMenu} from "../../actions/actionCreators/dashboardContestsActionCreator";
import { URL } from "../../api/baseURL";

import historyLocationPath from "../../utils/history/historyLocationPath";
import PrivateRoute from "../../components/Route/PrivateRoute";
import {ROLE} from "../../constants";


function DashboardPage(props) {
    const { sideMenuIsOpen } = props;

    const closeSideMenu = () => {
        if(sideMenuIsOpen){
            props.closeOrOpenSideMenu(sideMenuIsOpen);
        }
    };

    return (
        <div className={style.dashboard}>

            <SideMenu/>

            <div
                className={sideMenuIsOpen ? `${style.openContest} ${style.content}` : style.content}
                onClick={closeSideMenu}
            >
                <Header/>

                    <Switch>

                        <Route
                            path={historyLocationPath([URL.CONTEST], URL.DASHBOARD)}
                            render={props => <ContestInfo {...props}/>}
                        />

                        <Route
                            path={historyLocationPath([URL.MY_DASHBOARD], URL.DASHBOARD)}
                            render={props => <MyDashboard {...props}/>}
                        />

                        <Route
                            path={historyLocationPath([URL.MY_ACCOUNT], URL.DASHBOARD)}
                            render={props => <Profile {...props}/>}
                        />


                        <Route
                            path={historyLocationPath([URL.ACTIVE_CONTESTS], URL.DASHBOARD)}
                            render={props => <ActiveContests {...props}/>}
                        />

                        <PrivateRoute
                            requireRole={ROLE.CREATIVE}
                            path={historyLocationPath([URL.MY_BALANCE], URL.DASHBOARD)}
                            component={Balance}
                            redirectTo={URL.MY_DASHBOARD}
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
