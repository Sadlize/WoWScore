import React from 'react';
import {IconContext} from "react-icons";

const IconRadioWrapper = ({children, count, color = 'gold', states}) => {
    let newChildren = []

    if (count > 0) {
        for (let i = 0; i < count; i++) {
            newChildren.push(React.cloneElement(children, {
                key: i,
                option: i,
                id: children.props.id + i,
                radioOption: states.radioOption,
                setRadioOption: states.setRadioOption,
                setDungeonTimestamp: states.setDungeonTimestamp,
            }))
        }
    }

    return (
        <IconContext.Provider value={{color: color}}>
            {count ? newChildren : children}
        </IconContext.Provider>
    );
};

export default IconRadioWrapper;
