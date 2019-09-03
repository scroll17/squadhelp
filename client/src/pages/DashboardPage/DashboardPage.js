import React, { Component } from 'react';

import UserNavigation from '../../components/UserNavigation/UserNavigation'

import Dashboard from "../../components/Dashboard/Dashboard";

import Footer from "../../components/Footer/Footer";

class DashboardPage extends Component{
    render() {
        return (
            <>
                <UserNavigation />

                <Dashboard />

                <footer>
                    <Footer />
                </footer>
            </>
        )
    }
}
export default DashboardPage;
