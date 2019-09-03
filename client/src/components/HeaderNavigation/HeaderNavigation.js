import React from 'react';
import { Link } from "react-router-dom";

import style from './HeaderNavigation.module.sass';

import ButtonsHomePage from '../Buttons/ButtonsHomePage/ButtonsHomePage'
import ListItem from './ListItem/ListItem'

import { textForForHeaderNavigation } from '../../utils/textAndLinksForPages/textAndLinksForPages'

import { URL } from '../../api/baseURL'

function HeaderNavigation() {

    const dropDownMenu = (lists) => {
        return lists.map(list => {
            return <ListItem list={list} key={list.header}/>
        })
    };

    return (
        <div className={style.header}>
            <div className={style.container}>
                <div className={style.row}>
                    <Link to={URL.HOME} className={style.link}>
                        <div className={style.logo}/>
                    </Link>

                    <div className={style.list}>
                        <ul className={style.headerList}>
                            {dropDownMenu(textForForHeaderNavigation)}
                        </ul>
                    </div>

                    <ButtonsHomePage link={URL.CONTEST_TYPE}>start contest</ButtonsHomePage>
                </div>
            </div>
        </div>
    )
}

export default HeaderNavigation;
