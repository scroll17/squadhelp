import React from 'react';
import { Route, Switch } from "react-router-dom";
import connect from "react-redux/es/connect/connect";
import style from './Dashboard.module.sass'

import MyContests  from './MyContests/MyContests'

import SideMenu from "./SideMenu/SideMenu";

import Header from "./Header/Header";
import {URL} from "../../api/baseURL";

function Dashboard(props) {
    return (
        <div className={style.dashboard}>

            <SideMenu />

            <div className={style.content}
                 style={props.sideMenuIsOpen ? {marginLeft: "250px"} : null}
            >
                <Header />

                <Switch>
                    <Route component={ MyContests } />
                </Switch>

            </div>
        </div>
    )
}
const mapStateToProps = (state) => ({
    sideMenuIsOpen: state.dashboardReducer.sideMenuIsOpen,
});
export default connect(mapStateToProps)(Dashboard);
