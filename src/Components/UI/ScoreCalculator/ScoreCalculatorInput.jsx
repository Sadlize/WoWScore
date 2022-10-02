import React, {useState} from 'react';
import clsx from "clsx";
import {calcPointsForKeyLevel} from "../../../utils/ScoreCalculator/calcPointsForKeyLevel";
import ScoreCalculatorModal from "./ScoreCalculatorModal";
import {AiFillStar} from "react-icons/ai";
import IconInput from "../../Input/IconInput";
import IconInputWrapper from "../../Input/IconInputWrapper";


const ScoreCalculatorInput = (props) => {
    const placeholder = props?.placeholder || ''
    const scorePerDungeon = props?.scorePerDungeon
    const setScorePerDungeon = props?.setScorePerDungeon
    const key = props?.index
    const week = props?.week

    const [input, setInput] = useState('')
    const isDifferent = (value) => {
        value = value.replace(/\D/g, '')
        if (input === value) {
            return 0 //same
        } else {
            return 1 //different
        }
    }
    const [modal, setModal] = useState(false)

    const [radioOption, setRadioOption] = useState(0)
    const [dungeonTimestamp, setDungeonTimestamp] = useState(0)

    return (
        <>
            <ScoreCalculatorModal visible={modal} setVisible={setModal}>
                <div className="dungeon-grid">
                    <h2 className={'content-heading'}>{key + ' ' + week}</h2>
                    <input
						value={input}
						placeholder={placeholder}
						onFocus={(e) => e.target.placeholder = ''}
						onBlur={(e) => e.target.placeholder = placeholder}
						type='text' autoComplete="off" maxLength='2'
						className={clsx({'grayscale100': scorePerDungeon[key][week] === 0}, 'CalcInput')}
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
                    />
                    <div>
                        <div className='StarTimestamp'>
                            <IconInputWrapper
                                color={"#ffbb4d"} count={3}
                                option={[radioOption, setRadioOption]}
                                setDungeonTimestamp={setDungeonTimestamp}
                            >
                                <IconInput
                                    name={key + week}
                                    icon={<AiFillStar/>}
                                    id={key + week[0] + 'star'}
                                />
                            </IconInputWrapper>
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
                value={input}
                placeholder={placeholder}
                onFocus={(e) => e.target.placeholder = ''}
                onBlur={(e) => e.target.placeholder = placeholder}
                type='text' autoComplete="off" maxLength='2'
                className={clsx({'grayscale100': scorePerDungeon[key][week] === 0}, 'CalcInput')}
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
                onContextMenu={(e) => {
                    e.preventDefault()
                    setModal(true)
                }}
            />
        </>
    );
};

export default ScoreCalculatorInput;
