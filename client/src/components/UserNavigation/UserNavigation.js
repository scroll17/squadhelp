import React, { Component } from 'react';
import style from "./UserNavigation.module.sass";

import HeaderNavigation from '../../components/HeaderNavigation/HeaderNavigation'

import UserNavigationDesktop from '../../components/UserNavigation/Desktop/UserNavigationDesktop'
import UserNavigationSmartphone from '../../components/UserNavigation/Smartphone/UserNavigationSmartphone'

class MainHomePage extends Component{
    render() {
        return (
            <>
                <div className={style.desktop}>
                    <UserNavigationDesktop />
                    <HeaderNavigation />
                </div>

                <div className={style.smartphone}>
                    <UserNavigationSmartphone />
                </div>
            </>
        )
    }
}
export default MainHomePage;
