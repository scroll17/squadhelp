import React from 'react';
import connect from "react-redux/es/connect/connect";


function PrivateComponent(props) {
    const { requireRole, user } = props;
    const isValidRole = requireRole.includes(user.role);

    return(
        <>
            { isValidRole && props.children}
        </>
    )
}
const mapStateToProps = (state) => ({
    user: state.userReducer.user,
});
export default connect(mapStateToProps)(PrivateComponent);

