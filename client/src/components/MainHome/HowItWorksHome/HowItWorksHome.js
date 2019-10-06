import React, { useMemo } from 'react';
import style from './HowItWorksHome.module.sass';

import ButtonsHomePage from '../../Buttons/ButtonsHomePage/ButtonsHomePage'
import TemplateCarouselHome from '../TemplateCarouselHome/TemplateCarouselHome'

import {URL} from '../../../api/baseURL';

import {LinksForHowItWorksHome} from '../../../utils/textAndLinksForPages/textAndLinksForPages';

function HowItWorksHome() {

    const templateCarouselHome = useMemo(() => (
        <TemplateCarouselHome
            images={LinksForHowItWorksHome.names}
        />
    ), [LinksForHowItWorksHome.names]);

    return (
        <div className={style.main}>
            <div className={style.container}>
                <div className={style.row}>

                    <ul className={style.navTabs}>
                        <li className={style.active}>
                            <span>Names</span>
                        </li>
                        <li className={style.lagged}>
                            <span>Taglines & Slogans</span>
                        </li>
                        <li className={style.lagged}>
                            <span>Logo Designs</span>
                        </li>
                    </ul>

                    {templateCarouselHome}

                    <div className={style.button}>
                        <ButtonsHomePage link={URL.NAME_IDEAS}>More Name Examples</ButtonsHomePage>
                    </div>

                </div>
            </div>
        </div>
    )

}

export default HowItWorksHome;

