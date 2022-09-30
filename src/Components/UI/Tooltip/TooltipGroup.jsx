import React from 'react';
import clsx from "clsx";

const TooltipGroup = ({children, ...props}) => {
    const position = props?.position
    const color = props?.color

    return (
        <div className={clsx('target', position)} style={{color: color}}>
            {children}
        </div>
    );
};

export default TooltipGroup;
