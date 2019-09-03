import React from 'react';
import connect from "react-redux/es/connect/connect";

import style from './Banner.module.sass'

function Banner(props) {
    const { user } = props;

    return (
        <>
            {user && (
                <section className={style.banner}>
                    <div className={style.container}>
                        <div className={style.row}>
                            <img src={'https://www.squadhelp.com/images/user_image/thumb/Ava-avatar.jpg'} alt={''}/>
                            <div className={style.information}>
                                <h4>{user.firstName}</h4>
                                <span>{user.email}</span>
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </>
    )
}

const mapStateToProps = (state) => ({
    user: state.userReducers.user,
});
export default connect(mapStateToProps)(Banner);