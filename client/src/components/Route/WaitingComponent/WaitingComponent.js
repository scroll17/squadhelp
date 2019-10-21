import React, { Suspense } from "react";
import style from './WaitingComponent.module.sass'

import { SQUAD_HELP_LOGO } from "../../../constants";

function WaitingComponent(Component) {
    const height = window.innerHeight;

    return props => (
        <Suspense fallback={
            <div className={style.fallback} style={{height: height}}>
                <img src={SQUAD_HELP_LOGO} alt={"squadhelp"} />
            </div>
        }>
            <Component {...props} />
        </Suspense>
    );
}
export default WaitingComponent;