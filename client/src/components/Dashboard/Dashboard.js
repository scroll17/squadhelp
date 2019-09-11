import React  from 'react';
import { Route, Switch } from "react-router-dom";
import connect from "react-redux/es/connect/connect";
import style from './Dashboard.module.sass'


import Header from "./Header/Header";
import SideMenu from "./SideMenu/SideMenu";

import MyContests  from './MyContests/MyContests'
import ContestInfo from "./ContestInfo/ContestInfo";


import {closeOrOpenSideMenu} from "../../actions/actionCreators/dashboardActionCreator";
import {URL} from "../../api/baseURL";

import historyLocationPath from "../../utils/historyLocationPath";


function Dashboard(props) {
    const styleForOpenMenu = props.sideMenuIsOpen ? {marginLeft: "250px"} : null;

    return (
        <div className={style.dashboard}>

            <SideMenu/>

            <div className={style.content} style={styleForOpenMenu}>
                <Header/>

                    <Switch>

                        <Route
                            exact
                            path={historyLocationPath([URL.CONTESTS, ':id'], URL.DASHBOARD)}
                            render={props => <ContestInfo {...props}/>}
                        />

                        <Route
                            exact
                            path={historyLocationPath([URL.MY_CONTESTS], URL.DASHBOARD)}
                            //path={`${URL.DASHBOARD}${URL.MY_CONTESTS}`}
                            render={props => {
                                console.log('render MyContests', historyLocationPath([URL.MY_CONTESTS], URL.DASHBOARD));
                                return <MyContests {...props}/>
                            }}
                            //component={ MyContests }
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
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
