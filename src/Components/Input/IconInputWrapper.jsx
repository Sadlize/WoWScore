import React from 'react';
import {IconContext} from "react-icons";

const IconInputWrapper = ({children, ...props}) => {
    let count = props?.count || false
    let color = props?.color

    let newChildren = []
    if (count) {
        for (let i = 0; i < count; i++) {
            newChildren.push(React.cloneElement(children, {
                key: i,
                option: i,
                id: children.props.id + i
            }))
        }
    }

    return (
        <IconContext.Provider value={{color: color}}>
            {count ? newChildren : children}
        </IconContext.Provider>
    );
};

export default IconInputWrapper;
