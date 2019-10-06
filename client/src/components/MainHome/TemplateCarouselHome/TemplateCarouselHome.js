import React, {useState, useEffect, useMemo}  from 'react';
import style from './TemplateCarouselHome.module.sass';

import { Carousel } from 'react-bootstrap';
import { isEqual, cloneDeep, size, last } from 'lodash'

function TemplateCarouselHome(props){

    const [width, setWidth] = useState(0);

    useEffect(() => {
        window.addEventListener('resize', widthResizeChange);
        return () => window.removeEventListener('resize', widthResizeChange);
    }, []);

    const widthResizeChange = () =>{
        const newWidth = resizeWidth();
        setWidth(newWidth);
    };
    const resizeWidth = () =>{
        const width = document.body.clientWidth;

        if(width <= 725){
            return 1
        }else if(width <= 900){
            return 2
        }
        return 3
    };


    const prevIcon = <span className={style.carouselIconPrev}><i className="fas fa-chevron-left"/></span>;
    const nextIcon = <span className={style.carouselIconNext}><i className="fas fa-chevron-right"/></span>;


    let arrayOfImages = cloneDeep(props.images);
    const carouselItem = useMemo(() => {

        const items = arrayOfImages;
        const image = (img) => ({backgroundImage: `url(${img})`});

        let newItems;
        if(isEqual(width, 2)){
            const cloneItems = cloneDeep(items);

            cloneItems.forEach( item => {
                const lastItemSrc = last(cloneItems).src;
                if(size(lastItemSrc) < 2){
                    lastItemSrc.push(item.src.pop())
                }else{
                    cloneItems.push({
                        src: [item.src.pop()]
                    })
                }
            });

            newItems = cloneItems

        }else if(isEqual(width, 1)){
            const cloneItems = cloneDeep(items);

            cloneItems.forEach( item => {
                if(size(item.src) > 1){
                    cloneItems.push(
                        {
                            src: [item.src.pop()]
                        },
                        {
                            src: [item.src.pop()]
                        }
                    );
                }
            });

            newItems = cloneItems
        }


        return (newItems || items).map( (item, id) => (
            <Carousel.Item key={id}>
                <div className={style.carousel}>
                    {
                        item.src.map( img => (
                            <div
                                className={style.item}
                                style={image(img)}
                                key={img}
                            />
                        ))
                    }
                </div>
            </Carousel.Item>
        ))
    }, [props.images, width]);

    return (
        <>
            { isEqual(width, 0) && setWidth(resizeWidth())}

            <div className={style.container}>
                <Carousel
                    indicators={false}
                    pauseOnHover={true}
                    nextIcon={nextIcon}
                    prevIcon={prevIcon}
                >
                    {carouselItem}
                </Carousel>
            </div>
        </>
    );


}

export default TemplateCarouselHome;
