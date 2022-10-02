import React from 'react';
import {IconContext} from "react-icons";

const IconInputWrapper = ({children, ...props}) => {
    const count = props?.count || false
    const color = props?.color || 'gold'
    const [radioOption, setRadioOption] = props.option
    const setDungeonTimestamp = props?.setDungeonTimestamp

    let newChildren = []
    if (count) {
        for (let i = 0; i < count; i++) {
            newChildren.push(React.cloneElement(children, {
                key: i,
                option: i,
                id: children.props.id + i,
                radioOption: radioOption,
                setRadioOption: setRadioOption,
                setDungeonTimestamp: setDungeonTimestamp,
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
