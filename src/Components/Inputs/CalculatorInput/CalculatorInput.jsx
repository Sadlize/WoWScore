import React, {useState} from 'react';
import clsx from "clsx";
import {calcPointsForKeyLevel} from "../../../utils/Calculator/Calculator";


const CalculatorInput = (props) => {
    const placeholder = props?.placeholder || ''
    const scorePerDungeon = props?.scorePerDungeon
    const setScorePerDungeon = props?.setScorePerDungeon
    const key = props?.index
    const week = props?.week

    const [input, setInput] = useState('')
    const isDifferent = (value) => {
        value = value.replace(/[^0-9]/g, '')
        if (input === value) {
            return 0 //same
        } else {
            return 1 //different
        }
    }

    return (
        <div id={key}>
            <input
                value={input}
                placeholder={placeholder}
                onFocus={(e) => e.target.placeholder = ''}
                onBlur={(e) => e.target.placeholder = placeholder}
                type='text' autoComplete="off" maxLength='2'
                className={clsx({'grayscale100': scorePerDungeon[key][week] === 0}, 'inp')}
                onChange={e => {
                    const value = e.target.value
                    if (value.length <= e.target.maxLength) {
                        if (isDifferent(value)) {
                            setInput(value)
                            setScorePerDungeon(prevState => (
                                {
                                    ...prevState,
                                    [key]: {...prevState[key], [week]: calcPointsForKeyLevel(+value)}
                                }
                            ))
                        }
                    }
                }}
                // onContextMenu={(e) => {
                //     e.preventDefault();
                // }}
            />
        </div>
    );
};

export default CalculatorInput;
