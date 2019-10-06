import React, { useMemo } from 'react';
import { Link } from "react-router-dom";

import style from './HeaderNavigation.module.sass';

import ButtonsHomePage from '../Buttons/ButtonsHomePage/ButtonsHomePage'
import ListItem from './ListItem/ListItem'

import { textForForHeaderNavigation } from '../../utils/textAndLinksForPages/textAndLinksForPages'

import { URL } from '../../api/baseURL'

function HeaderNavigation() {

    const dropDownMenu = useMemo(() => {
        const lists = textForForHeaderNavigation;
        return lists.map(list => {
            return <ListItem list={list} key={list.header}/>
        })
    }, [textForForHeaderNavigation]);

    return (
        <div className={style.header}>
            <div className={style.container}>
                <div className={style.row}>
                    <Link to={URL.HOME} className={style.link}>
                        <div className={style.logo}/>
                    </Link>

                    <div className={style.list}>
                        <ul className={style.headerList}>
                            {dropDownMenu}
                        </ul>
                    </div>

                    <ButtonsHomePage link={URL.CONTEST_TYPE}>s
                        tart contest
                    </ButtonsHomePage>
                </div>
            </div>
        </div>
    )
}

export default HeaderNavigation;
