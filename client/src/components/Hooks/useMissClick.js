import { useState, useEffect } from 'react';
import {DISPLAY} from "../../constants";

export function useMissClick(props) {
    const { current, customFunction } = props;

    const [displayStyle, setDisplayStyle] = useState(DISPLAY.NONE);

    const toOpen = () => {
        const nextDisplayStyle = displayStyle === DISPLAY.NONE ? DISPLAY.BLOCK : DISPLAY.NONE;
        setDisplayStyle(nextDisplayStyle);
    };

    const onClickOutsideHandler = (event) => {
        if (displayStyle === DISPLAY.BLOCK && !current.contains(event.target)) {
            setDisplayStyle(DISPLAY.NONE)
        }
    };

    useEffect(() => {
        const onClick = customFunction ? customFunction : onClickOutsideHandler;
        window.addEventListener('click', onClick);
        return () => window.removeEventListener('click', onClick);
    });


    return [displayStyle, toOpen];
}