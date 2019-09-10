import React from 'react';
import connect from "react-redux/es/connect/connect";

import style from './ContestsInDraft.module.sass'


function ContestsInDraft(props) {
    return (
        <div className={style.contestsInDraft}>
            <div className={style.title}>Contests in Draft</div>
            <div className={style.listBox}>

            </div>
        </div>
    )
}
const mapStateToProps = (state) => ({
    sideMenuIsOpen: state.dashboardReducer.sideMenuIsOpen,
});
export default connect(mapStateToProps)(ContestsInDraft);
