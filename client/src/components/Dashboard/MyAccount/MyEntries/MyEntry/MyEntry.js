import React from 'react';

import style from './MyEntry.module.sass'

import statusInIcon from "../../../../../utils/statusInIcon";
import LinkToContestById from "../../../../Links/LinkToContestById/LinkToContestById";

function MyEntry(props) {
    const { contestId, status, isValid, text, file } = props;
    const { title, contestType } = props.contestInfo;

    return (
        <div className={style.contest}>
            <div className={style.entryInfo}>

                <LinkToContestById id={contestId} title={title}/>


                <p className={style.contestType}>
                    {contestType}
                </p>
                <p className={style.contentEntry}>
                    <span>Content entry:</span>
                    {text || file}
                </p>

                <ul className={style.statusInfo}>
                    <li className={style.isValid}>
                        {statusInIcon(isValid)}
                        {`${isValid}`}
                    </li>
                    <li className={style.status}>
                        {statusInIcon(status)}
                        {status}
                    </li>
                </ul>
            </div>
        </div>
    )
}
export default MyEntry;
