import React, { Component } from 'react';

import UserNavigation from '../../components/UserNavigation/UserNavigation'
import BannerHome from '../../components/MainHome/BannerHome/BannerHome'
import HowItWorksHome from '../../components/MainHome/HowItWorksHome/HowItWorksHome'

import MarketplaceDomainsHome from '../../components/MainHome/MarketplaceDomainsHome/MarketplaceDomainsHome'
import GrowBusinessHome from '../../components/MainHome/GrowBusinessHome/GrowBusinessHome'
import HowDoNameContestsWork from "../../components/MainHome/HowDoNameContestsWork/HowDoNameContestsWork";
import Footer from "../../components/Footer/Footer";

class MainHomePage extends Component{
    render() {
        return (
            <>
                <UserNavigation />

                <div>
                    <BannerHome />
                    <HowItWorksHome />
                    <MarketplaceDomainsHome />
                    <GrowBusinessHome />
                    <HowDoNameContestsWork />
                </div>

                <footer>
                    <Footer />
                </footer>
            </>
        )
    }
}
export default MainHomePage;
