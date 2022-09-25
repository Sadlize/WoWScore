import React, {useState} from "react";
import "./Tooltip.css";

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
    console.log(    [props.textDecoration || "", props.position || ""].join(' ')                )

    console.log(    (props.textDecoration + ' ' || "") + (props.position + ' ' || "")           )
    return (
        <div
            className={[props.textDecoration || "", props.position || ""].join(' ')}
            onMouseEnter={showTip}
            onMouseLeave={hideTip}
        >
            {props.target}
            {active && (
                <div className={'Tooltip-Tip ' + (props.direction || "top")}>
                    {props.children}
                </div>
            )}
        </div>
    );
};

export default Tooltip;
