import React, { useState, useEffect } from 'react';
import {DISPLAY} from "../../constants";

export function useMissClick(props) {
    const { current } = props;

    const [displayStyle, setDisplayStyle] = useState(DISPLAY.NONE);


    const toOpen = () => {
        const nextDisplayStyle = displayStyle === DISPLAY.NONE ? DISPLAY.BLOCK : DISPLAY.NONE;
        setDisplayStyle(nextDisplayStyle);
    };

    const onClickOutsideHandler = (event) => {
        console.log(props);
        if (displayStyle === DISPLAY.BLOCK && !current.contains(event.target)) {
            setDisplayStyle(DISPLAY.NONE)
        }
    };

    useEffect(() => {
        window.addEventListener('click', onClickOutsideHandler);
        return () => window.removeEventListener('click', onClickOutsideHandler);
    });


    return [displayStyle, toOpen];
}