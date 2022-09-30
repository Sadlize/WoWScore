import React from 'react';
import clsx from "clsx";

const TooltipGroup = ({children, ...props}) => {
    const position = props?.position
console.log(position)
    return (
        <div className={clsx('target', position)}>
            {children}
        </div>
    );
};

export default TooltipGroup;
