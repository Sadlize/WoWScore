import React from 'react';
import clsx from "clsx";

const IconInput = (props) => {
    const icon = props?.icon
    const radioOption = props?.radioOption
    const setRadioOption = props?.setRadioOption
    const option = props?.option
    const key = props?.id
    const name = props?.name
    const setDungeonTimestamp = props?.setDungeonTimestamp

    return (
        <>
            <input
                checked={radioOption === option} type="radio"
                name={name} id={key}
                onChange={(() => {
                    setRadioOption(option)
                    setDungeonTimestamp(option * 50)
                })}
            />
            <label
                htmlFor={key}
                className={clsx({'grayscale100': radioOption < option})}
            >
                {icon}
            </label>
        </>
    );
};

export default IconInput;
