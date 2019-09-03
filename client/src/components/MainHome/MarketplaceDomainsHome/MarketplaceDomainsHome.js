import React  from 'react';
import style from './MarketplaceDomainsHome.module.sass';

import { textForMarketplaceDomainsHome } from '../../../utils/textAndLinksForPages/textAndLinksForPages'

function MarketplaceDomainsHome(){

        const MarketplaceDomains = ( arrayOfData ) => {
            return arrayOfData.map( content => {
                const img = {backgroundImage: `url(${content.src})`};
                return(
                    <div className={style.heroHighlightContainer} key={content.title}>
                        <div className={style.heroHighlight}>
                            <div className={style.images} style={img} />
                        </div>
                        <h3>{content.title}</h3>
                        <span>{content.description}</span>
                    </div>
                )
            });
        };

        return (
            <div className={style.marketplaceDomainsHome}>
                <div className={style.row}>
                    <div className={style.heading}>
                        <h2>Why Squadhelp?</h2>
                        <span />
                    </div>

                    <div className={style.container}>
                        {MarketplaceDomains(textForMarketplaceDomainsHome)}
                    </div>
                </div>
            </div>
        )

}
export default MarketplaceDomainsHome;

