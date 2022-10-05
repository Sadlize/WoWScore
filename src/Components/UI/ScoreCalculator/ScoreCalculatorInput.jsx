import React, {useState} from 'react';
import clsx from "clsx";
import ScoreCalculatorModal from "./ScoreCalculatorModal";
import {AiFillStar} from "react-icons/ai";
import IconRadioInput from "../../Input/IconRadioInput/IconRadioInput";
import IconRadioWrapper from "../../Input/IconRadioInput/IconRadioWrapper";
import _ from "lodash";
import {calcPointsForKeyLevel} from "../../../utils/calculatorFunctionHandler";

const ScoreCalculatorInput = ({week, index, inputValue, placeholder, scorePerDungeon, setScorePerDungeon}) => {

    const isDifferent = (value) => {
        value = value.replace(/\D/g, '')
        return inputValue !== value; //true - different  false - same
    }

    const inputNewValue = (event) => {
        const value = event.target.value
        if (value.length <= event.target.maxLength) {
            if (isDifferent(value)) {
                if (!isNaN(value)) {
                    setScorePerDungeon(prevState =>
                        _.merge({}, prevState, {
                            [index]: {
                                [week]: {
                                    mythic_level: +value,
                                    score: calcPointsForKeyLevel(+value),
                                    num_keystone_upgrades: 1,
                                }
                            }
                        })
                    )
                }
            }
        }
    }

    const [modal, setModal] = useState(false)

    const [radioOption, setRadioOption] = useState(0)
    const [dungeonTimestamp, setDungeonTimestamp] = useState(0)

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
                            <IconRadioWrapper
                                color={"#ffbb4d"} count={3}
                                states={{radioOption, setRadioOption, setDungeonTimestamp}}
                            >
                                <IconRadioInput
                                    name={index + week}
                                    icon={<AiFillStar/>}
                                    id={index + week[0] + 'star'}
                                />
                            </IconRadioWrapper>
                        </div>
                        <input
                            type="range" min="0" max="100" step="50" value={dungeonTimestamp}
                            onChange={(e) => {
                                if (+e.target.value === 0) setRadioOption(0)
                                if (+e.target.value === 50) setRadioOption(1)
                                if (+e.target.value === 100) setRadioOption(2)
                                setDungeonTimestamp(+e.target.value)
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
