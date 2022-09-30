import React from 'react';
import clsx from "clsx";

const IconInput = (props) => {
    let icon = props?.icon
    let radioOption = props?.radioOption
    let setRadioOption = props?.setRadioOption
    let option = props?.option
    let key = props?.id
    let name = props?.name

    return (
        <>
            <input
                checked={radioOption === option} type="radio"
                name={name} id={key}
                onChange={(() => {
                    setRadioOption(option)
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
