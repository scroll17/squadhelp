import React, {useState, useEffect, useMemo} from 'react';
import style from './BannerHome.module.sass';

import ButtonsHomePage from '../../Buttons/ButtonsHomePage/ButtonsHomePage'

import { URL } from '../../../api/baseURL'

import { size } from 'lodash';

function BannerHome() {
    const [sentence, setSentence] = useState(0);

    const invites = useMemo( () => [
        ' a Company',
        " a Brand",
        " a Website",
        " a Service",
        " a Book",
        " a Business",
        " an App",
        " a Product",
        " a Startup"].map(i => <b>{i}<span /></b>
    ), []);

    useEffect(() => {
        const interval = setInterval(() => {
            if (sentence < size(invites)) {
                setSentence(sentence + 1)
            } else {
                setSentence(0)
            }
        }, 4000);
        return () => clearInterval(interval);
    });


    return (
        <div className={style.main}>
            <div className={style.bannerHome}>
                <div className={style.container}>
                    <div className={style.bannerContent}>

                        <h1 className={style.loadingBar}>
                            <span>Find the Perfect Name for</span>
                            <span className={style.wordsWrapper}>{invites[sentence]}</span>
                        </h1>

                        <p>
                            <span>Launch a naming contest to engage hundreds of naming experts as you’re guided through our agency-level naming process.</span>
                            <br/>
                            <span>Or, explore our hand-picked collection of premium names available for immediate purchase</span>
                        </p>

                        <ul>
                            <li className={style.startContest}>
                                <ButtonsHomePage link={URL.CONTEST_TYPE}>
                                    start a contest
                                </ButtonsHomePage>
                            </li>
                            <li className={style.liOr}>Or</li>
                            <li className={style.exploreNames}>
                                <ButtonsHomePage link={"/premium-domains-for-sale"}>
                                    Explore Names ForSale
                                </ButtonsHomePage>
                            </li>
                        </ul>

                    </div>
                </div>
            </div>
        </div>
    )
}
export default BannerHome;
