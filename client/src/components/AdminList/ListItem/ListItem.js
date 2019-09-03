import React from 'react';
import style from './ListItem.module.sass';

import { ROLE } from '../../../constants'
import { HEX_COLOR } from "../../../constants";

function ListItem(props){
    const { clickToItem, name, id, status, role } = props;
    const adminStyle = role === ROLE.ADMIN ? {color: HEX_COLOR.BLUE} : null;
        return(
            <div className={style.listItem} onClick={() => clickToItem(id, status)}>
                <div className={style.avatarAndData}>
                    <div className={style.avatar} />
                    <div className={style.name}>
                        <div className={style.listItemName}>
                            {name}
                        </div>
                        <span
                            className={style.listItemRole}
                            style={adminStyle}
                        >
                            {role}
                        </span>
                    </div>
                </div>
                <div className={ status ? style.active : style.passive } >
                    <i className="fas fa-check check" />
                </div>
            </div>
        )
}
export default ListItem;
