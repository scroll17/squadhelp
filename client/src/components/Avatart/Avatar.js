import React  from 'react';
import connect from "react-redux/es/connect/connect";

import style from './Avatar.module.sass';

import { USER_AVATAR } from "../../constants";

function Avatar(props){
    const { customAvatar, customStyle, size, user } = props;

    const imageSizeStyle = {
      width: `${size}px`,
      height: `${size}px`
    };

    const image = () => {
        const src = customAvatar ? customAvatar : user.avatar;
        return `url(${USER_AVATAR}${src})`
    };

    return (
        <div
            icon={'avatar'}
            className={style.avatar}
            style={{
                backgroundImage: image(),
                ...imageSizeStyle,
                ...customStyle
            }}
        />
    )
}
Avatar.defaultProps = {
    customStyle: null,
    customAvatar: null,
    size: 20
};

const mapStateToProps = (state) => ({
    user: state.userReducers.user
});
export default connect(mapStateToProps)(Avatar);

