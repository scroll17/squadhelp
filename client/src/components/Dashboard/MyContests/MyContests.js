import React from 'react';
import connect from "react-redux/es/connect/connect";

import StatusOfContest from "./StatusOfContest/StatusOfContest";

function MyContests(props) {
    return (
        <div>
            <StatusOfContest />
        </div>
    )
}
const mapStateToProps = (state) => ({
    sideMenuIsOpen: state.dashboardReducer.sideMenuIsOpen,
});
export default connect(mapStateToProps)(MyContests);
