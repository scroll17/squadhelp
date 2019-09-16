import React , { useState } from 'react';
import connect from "react-redux/es/connect/connect";
import { Link } from "react-router-dom";

import style from './UserNavigationSmartphone.module.sass';

import UserMenu from '../UserMenu/UserMenu'

import { URL } from '../../../api/baseURL'
import { DISPLAY } from '../../../constants'

function UserNavigationSmartphone(props) {
    const [displayStyle, setDisplayStyle] = useState(DISPLAY.NONE);

    const toOpenMenu = () => {
        const nextDisplayStyle = displayStyle === DISPLAY.NONE ? DISPLAY.BLOCK : DISPLAY.NONE;
        setDisplayStyle(nextDisplayStyle);
    };

    return (
        <header className={style.header}>
            <nav className={style.navBar}>
                <div className={style.container}>
                    <div className={style.navBarHeader}>

                        <Link to={URL.HOME} className={style.navBarBrand}>
                            <img src={'https://www.squadhelp.com/images/squadhelp-logo-color.jpg'} alt={''} />
                        </Link>

                        <div className={style.navBarToggle}>
                            {props.user && <UserMenu />}

                            <div className={style.navBarToggleCollapsed}
                                 onClick={toOpenMenu}
                                 onMouseDown={(e) => {e.preventDefault()}}
                            >
                                <i className="fas fa-bars" />
                            </div>

                        </div>


                        {displayStyle === DISPLAY.BLOCK &&
                            <ul className={style.dropdownMenu} >

                                <li>
                                    <i className="fa fa-phone"/>
                                    <Link to={"tel:(877)355-3585"}>(877) 355-3585</Link>
                                </li>

                                {props.user ? null :
                                    <li>
                                        <Link to={URL.LOGIN}>Login</Link> / <Link to={URL.SIGN_UP}>Sign Up</Link>
                                    </li>
                                }

                                <li><Link to={URL.HOME}>Name ideas</Link></li>
                                <li><Link to={URL.HOME}>Contest</Link></li>
                                <li><Link to={URL.HOME}>Our work</Link></li>
                                <li><Link to={URL.HOME}>Names for sale</Link></li>
                                <li><Link to={URL.HOME}>Blog</Link></li>
                            </ul>
                        }


                    </div>
                </div>
            </nav>
        </header>
    )
}

const mapStateToProps = (state) => ({
    user: state.userReducer.user
});
export default connect(mapStateToProps)(UserNavigationSmartphone);

