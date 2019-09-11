import React, { useEffect } from 'react';
import { Route, Switch } from "react-router-dom";
import connect from "react-redux/es/connect/connect";
import style from './Dashboard.module.sass'


import Header from "./Header/Header";
import SideMenu from "./SideMenu/SideMenu";

import MyContests  from './MyContests/MyContests'


import {closeOrOpenSideMenu} from "../../actions/actionCreators/dashboardActionCreator";
import {URL} from "../../api/baseURL";
import history from "../../boot/browserHistory";

import { isEqual } from 'lodash'
import historyLocationPath from "../../utils/historyLocationPath";

function Dashboard(props) {
    const styleForOpenMenu = props.sideMenuIsOpen ? {marginLeft: "250px"} : null;

    useEffect(() => {
        //console.log(historyLocationPath(URL.MY_CONTESTS));
       if(isEqual(history.location.pathname, URL.DASHBOARD)){
           history.push(`${URL.DASHBOARD}${URL.MY_CONTESTS}`)
       }
    });

    return (
        <div className={style.dashboard}>

            <SideMenu/>

            <div className={style.content} style={styleForOpenMenu}>
                <Header/>

                <Switch>

{/*                    <Route path={historyLocationPath(URL.CONTESTS, ':id')}
                           render={props => <Header {...props}/>}
                    />*/}

                    <Route  path={historyLocationPath(URL.MY_CONTESTS)} component={ MyContests } />

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
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
