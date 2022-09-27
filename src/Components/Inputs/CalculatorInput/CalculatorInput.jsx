import React from 'react';
import clsx from "clsx";
import {calcPointsForKeyLevel} from "../../../utils/Calculator/Calculator";


const CalculatorInput = (props) => {
    const placeholder = props?.placeholder || ''
    const scorePerDungeon = props?.scorePerDungeon
    const setScorePerDungeon = props?.setScorePerDungeon
    const key = props?.index
    const week = props?.week

    return (
        <div id={key}>
            <input
                placeholder={placeholder}
                onFocus={(e) => e.target.placeholder = ''}
                onBlur={(e) => e.target.placeholder = placeholder}
                type='number' autoComplete="off"
                className={clsx({'grayscale100': scorePerDungeon[key][week] === 0}, 'inp')}

                onChange={event =>
                    setScorePerDungeon(prevState => (
                        {
                            ...prevState,
                            [key]: {
                                ...prevState[key],
                                [week]: calcPointsForKeyLevel(+event.target.value)
                            }
                        }
                    ))}
                // onContextMenu={(e) => {
                //     e.preventDefault();
                // }}
            />
        </div>
    );
};

export default CalculatorInput;
