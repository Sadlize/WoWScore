import React from 'react';
import clsx from "clsx";
import _ from "lodash";
import {calcPointsForKeyLevel} from "../../../utils/calculatorFunctionHandler";
// import changeScorePerDungeon from '../../UI/ScoreCalculator/ScoreCalculatorInput';

const IconRadioInput = (
    {
        count, id, name, icon, index, week, currentOption,
        dungeonTimestamp, scorePerDungeon, setScorePerDungeon
    }) => {

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
                            // changeScorePerDungeon({
                            //     'num_keystone_upgrades': 1,
                            //     clear_time_ms: dungeonTimestamp[i],
                            // })
                            setScorePerDungeon(prevState =>
                                _.merge({}, prevState, {
                                    [index]: {
                                        [week]: {
                                            num_keystone_upgrades: i,
                                            clear_time_ms: dungeonTimestamp[i],
                                            score: calcPointsForKeyLevel(
                                                scorePerDungeon[index][week]?.mythic_level,
                                                dungeonTimestamp[i],
                                                dungeonTimestamp[3],
                                            ),
                                        },
                                    }
                                }))
                        }}
                    />
                    <label htmlFor={id + i}>
                        {elementIcon}
                    </label>
                </div>
            )
        }
    }
    return (
        <>
            {output}
        </>
    );
};

export default IconRadioInput;
