import React from 'react';
import connect from "react-redux/es/connect/connect";
import { Link } from "react-router-dom";

import style from './Menu.module.sass'

import { URL } from "../../../../api/baseURL";
import { ROLE } from "../../../../constants";

import historyLocationPath from "../../../../utils/history/historyLocationPath";

function Menu(props) {
    const { sideMenuIsOpen, links, userRole} = props;

    return links.map( link => {
        let content;


        if(link.whoSees && !link.whoSees.includes(userRole)){
            return
        }

        if(sideMenuIsOpen){
            content = (
                <div className={style.navLink}>
                    <i className={link.class} />
                    <span>{link.title}</span>
                </div>
            );
        }else{
            content = (<i className={link.class} />);
        }

        return(
            <Link to={historyLocationPath([link.to], URL.DASHBOARD)} className={style.link} key={link.to}>
                {content}
            </Link>
        )
    })
}
const mapStateToProps = (state) => ({
    userRole: state.userReducer.user.role,
    sideMenuIsOpen: state.dashboardReducer.sideMenuIsOpen,
});
export default connect(mapStateToProps)(Menu);