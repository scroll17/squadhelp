import React from 'react';
import PropTypes from 'prop-types';

import connect from "react-redux/es/connect/connect";


function PrivateComponent(props) {
    const { requireRole, desiredOptions, user } = props;
    const isValidRole = requireRole.includes(user.role);

    return(
        <>
            { isValidRole && desiredOptions && props.children}
        </>
    )
}

PrivateComponent.propTypes = {
    desiredOptions: PropTypes.bool
};

PrivateComponent.defaultProps = {
    desiredOptions: true
};

const mapStateToProps = (state) => ({
    user: state.userReducer.user,
});
export default connect(mapStateToProps)(PrivateComponent);

