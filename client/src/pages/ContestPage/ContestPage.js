import React, { Component } from 'react';
import connect from "react-redux/es/connect/connect";


import ContestSteps from '../../components/Contest/ContestSteps'
import ContestsForm from '../../components/Forms/ContestForms/ContestForms'
import StartContestSteps from "../../components/Contest/StartContestSteps/StartContestSteps";

import UserNavigation from "../../components/UserNavigation/UserNavigation";
import Footer from '../../components/Footer/Footer'

import { last } from 'lodash';
import { CONTEST } from "../../constants";

class ContestPage extends Component{

    componentDidUpdate(prevProps, prevState, snapshot) {
        window.scrollTo(0, 0);
    }

    render() {
        return (
            <>
                <UserNavigation />
                <StartContestSteps />
                {last(this.props.contestNow) === CONTEST.SELECT ?
                    <ContestSteps />
                    :
                    <ContestsForm />
                }
                <Footer />
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    contestNow: state.contestReducer.contestNow,
});
export default connect(mapStateToProps)(ContestPage);
