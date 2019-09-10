import React, {useEffect} from 'react';
import connect from "react-redux/es/connect/connect";

import StatusOfContest from "./StatusOfContest/StatusOfContest";
import ContestsInDraft from "./ContestsInDraft/ContestsInDraft";

import { getUserContestsMenu } from "../../../actions/actionCreators/dashboardActionCreator";


function MyContests(props) {

    useEffect(() => {
        props.getUserContestsMenu()
    });

    return (
        <div>
            <StatusOfContest />
            <ContestsInDraft />
        </div>
    )
}

const mapStateToProps = (state) => ({});
const mapDispatchToProps = dispatch => ({
    getUserContestsMenu: () => dispatch(getUserContestsMenu()),
});
export default connect( mapStateToProps, mapDispatchToProps )(MyContests);

