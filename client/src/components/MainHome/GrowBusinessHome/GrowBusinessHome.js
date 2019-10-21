import React, { useMemo, useCallback }  from 'react';
import style from './GrowBusinessHome.module.sass';


function GrowBusinessHome(){
    const arrayOfImages = [
        'Forbes-logo-vector',
        'the_next_web',
        'chicago-hover',
        'mashable-hover'
    ];

    const images = (img) => ({ backgroundImage:  `url(https://www.squadhelp.com/assets/nimages/home_images/${img}.png)`});

    const rowOfImages = useMemo(() => arrayOfImages.map( item => {
        return(
            <div className={style.image} style={images(item)} key={item}/>
        )
    }),[arrayOfImages]);

    const liItems = useCallback((count, text) => {
        return(
            <li>
                <h6>{count}</h6>
                <p>{text}</p>
            </li>
        )
    }, []);

    return (
        <div className={style.growBusinessHome}>
            <div className={style.container}>
                <div className={style.links}>
                    {rowOfImages}
                </div>
                <div className={style.text}>
                    <ul>
                        {liItems('222,681', 'Creatives')}
                        {liItems('23,141', 'Customers')}
                        {liItems('85', 'Industries')}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default GrowBusinessHome;
