import React, {useState} from 'react';
import clsx from "clsx";
import ScoreCalculatorModal from "./ScoreCalculatorModal";
import {AiFillStar} from "react-icons/ai";
import _ from "lodash";
import {calcPointsForKeyLevel} from "../../../utils/calculatorFunctionHandler";
import IconRadioInput from "../../Input/IconRadioInput/IconRadioInput";

const ScoreCalculatorInput = ({week, index, inputValue, placeholder, scorePerDungeon, setScorePerDungeon}) => {

    const isDifferent = (value) => {
        value = value.replace(/\D/g, '')
        return inputValue !== value; //true - different  false - same
    }
    const inputNewValue = (event) => {
        const value = event.target.value
        if (value.length <= event.target.maxLength) {
            if (isDifferent(value)) {
                if (!isNaN(value)) changeScorePerDungeon(
                    {
                        'mythic_level': +value,
                        'score': calcPointsForKeyLevel(+value),
                        'num_keystone_upgrades': 1,
                        'clear_time_ms': 0,
                    },
                )
            }
        }
    }
    const changeScorePerDungeon = (values) => {
        setScorePerDungeon(prevState =>
            _.merge({}, prevState, {
                [index]: {
                    [week]: values
                }
            })
        )
    }

    const [modal, setModal] = useState(false)
    let radioOption = scorePerDungeon[index][week]?.num_keystone_upgrades
    const keyMaxTimestamp = {
        STRT: 2340999,
        GD: 1800999,
        GMBT: 1800999,
        ID: 1800999,
        LOWR: 2520999,
        UPPR: 2100999,
        WORK: 1920999,
        YARD: 2280999,
    }
    const dungeonTimestamp = scorePerDungeon[index][week]?.clear_time_ms

    const rangeMax = Math.round(keyMaxTimestamp[index] * 0.4)
    const rangeMin = rangeMax * -1
    const rangeStep = rangeMax * 0.02

    return (
        <>
            <ScoreCalculatorModal visible={modal} setVisible={setModal}>
                <div className="dungeon-grid">
                    <h2 className={'content-heading'}>{index + ' ' + week}</h2>
                    <input
                        value={`${inputValue}`}
                        placeholder={placeholder}
                        onFocus={(e) => {
                            e.target.placeholder = ''
                            if (e.target.value === '0') e.target.value = ''
                        }}
                        onBlur={(e) => e.target.placeholder = placeholder}
                        type='text' autoComplete="off" maxLength='2'
                        className={
                            clsx({
                                'grayscale100': scorePerDungeon[index][week]?.score === 0 ||
                                    scorePerDungeon[index][week]?.num_keystone_upgrades === 0
                            }, 'CalcInput')
                        }
                        onChange={e => {
                            inputNewValue(e)
                        }}
                    />
                    <div>
                        <div className='StarTimestamp'>
                            <IconRadioInput
                                count={3}
                                id={index + week[0] + 'star'}
                                name={index + week}
                                icon={<AiFillStar style={{color: "#ffbb4d"}}/>}
                                index={index}
                                week={week}
                                currentOption={radioOption}
                                dungeonTimestamp={[rangeMin, 0, rangeMax / 2, rangeMax]}
                                setScorePerDungeon={setScorePerDungeon}
                            />
                        </div>
                        <input
                            type="range" min={rangeMin} max={rangeMax} step={rangeStep}
                            value={dungeonTimestamp}
                            style={{width: '300px'}}
                            onChange={(e) => {
                                if (+e.target.value >= rangeMin) {
                                    changeScorePerDungeon({'num_keystone_upgrades': 0})
                                }
                                if (+e.target.value >= 0) {
                                    changeScorePerDungeon({'num_keystone_upgrades': 1})
                                }
                                if (+e.target.value >= rangeMax / 2) {
                                    changeScorePerDungeon({'num_keystone_upgrades': 2})
                                }
                                if (+e.target.value === rangeMax) {
                                    changeScorePerDungeon({'num_keystone_upgrades': 3})
                                }
                                changeScorePerDungeon({'clear_time_ms': +e.target.value})
                            }}
                        />
                    </div>
                </div>
            </ScoreCalculatorModal>
            <input
                value={`${inputValue}`}
                placeholder={placeholder}
                onFocus={(e) => {
                    e.target.placeholder = ''
                    if (e.target.value === '0') e.target.value = ''
                }}
                onBlur={(e) => e.target.placeholder = placeholder}
                type='text' autoComplete="off" maxLength='2'
                className={clsx({
                    'grayscale100': scorePerDungeon[index][week]?.score === 0 ||
                        scorePerDungeon[index][week]?.num_keystone_upgrades === 0
                }, 'CalcInput')}
                onChange={e => {
                    inputNewValue(e)
                }}
                onContextMenu={(e) => {
                    e.preventDefault()
                    setModal(true)
                }}
            />
        </>
    );
};

export default ScoreCalculatorInput;
