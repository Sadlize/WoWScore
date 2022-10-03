import React from 'react';
import clsx from "clsx";

const IconRadioInput = ({id, name, icon, option, ...states}) => {

    return (
        <>
            <input
                checked={states.radioOption === option} type="radio"
                name={name} id={id}
                onChange={(() => {
                    states.setRadioOption(option)
                    states.setDungeonTimestamp(option * 50)
                })}
            />
            <label
                htmlFor={id}
                className={clsx({'grayscale100': states.radioOption < option})}
            >
                {icon}
            </label>
        </>
    );
};

export default IconRadioInput;
