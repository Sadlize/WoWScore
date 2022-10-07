import React from 'react';
import clsx from "clsx";
import _ from "lodash";

const IconRadioInput = ({count, id, name, icon, index, week, currentOption, dungeonTimestamp, setScorePerDungeon}) => {
    const output = []
    let elementIcon

    if (count > 0) {
        for (let i = 0; i <= count; i++) {
            if (i === 0) {
                elementIcon = React.cloneElement(icon, {
                    style: {filter: 'brightness(0.5)'},
                })
            } else elementIcon = icon
            output.push(
                <div
                    key={id + i}
                    className={clsx({'grayscale100': currentOption < i}, 'star' + i)}>
                    <input
                        checked={currentOption === i} type="radio"
                        name={name} id={id + i}
                        onChange={() => {
                            setScorePerDungeon(prevState =>
                                _.merge({}, prevState, {
                                    [index]: {
                                        [week]: {
                                            num_keystone_upgrades: i,
                                            clear_time_ms: dungeonTimestamp[i],
                                        },
                                    }
                                }))
                        }}
                    />
                    <label htmlFor={id + i}>
                        {elementIcon}
                    </label>
                </div>
            )}
        }
    return (
        <>
            {output}
        </>
    );
};

export default IconRadioInput;
