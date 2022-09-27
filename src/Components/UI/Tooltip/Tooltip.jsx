import React, {useState} from "react";
import "./Tooltip.css";
import clsx from 'clsx'

const Tooltip = (props) => {
    let timeout;
    const [active, setActive] = useState(false);

    const showTip = () => {
        timeout = setTimeout(() => {
            setActive(true);
        }, props.delay || 400);
    };

    const hideTip = () => {
        clearInterval(timeout);
        setActive(false);
    };

    return (
        <div
            className={clsx(props.textDecoration, props.position)}
            onMouseEnter={showTip}
            onMouseLeave={hideTip}
        >
            {props.target}
            {active && (
                <div className={clsx('Tooltip-Tip', props.direction || "top")}>
                    {props.children}
                </div>
            )}
        </div>
    );
};

export default Tooltip;
