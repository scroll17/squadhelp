import React  from 'react';
import style from './GrowBusinessHome.module.sass';


function GrowBusinessHome(){
    const arrayOfImages = [
        'Forbes-logo-vector',
        'the_next_web',
        'chicago-hover',
        'mashable-hover'
    ];

    const rowOfImages = (items) => items.map( item => {
        return(
            <div className={style.image} style={images(item)} key={item}/>
        )
    });

    const liItems = (count, text) => (
            <li>
                <h6>{count}</h6>
                <p>{text}</p>
            </li>
    );

    const images = (img) => ({ backgroundImage:  `url(https://www.squadhelp.com/assets/nimages/home_images/${img}.png)`});

    return (
        <div className={style.growBusinessHome}>
            <div className={style.container}>
                <div className={style.links}>
                    {rowOfImages(arrayOfImages)}
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
