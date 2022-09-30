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
        value = value.replace(/[^0-9]/g, '')
        if (input === value) {
            return 0 //same
        } else {
            return 1 //different
        }
    }
    const [modal, setModal] = useState(false)
    const [radioOption, setRadioOption] = useState(0)
    return (
        <>
            <ScoreCalculatorModal visible={modal} setVisible={setModal}>
                <div className="dungeon-grid">
                    <h2 className={'content-heading'}>{key + ' ' + week}</h2>
                    <input
                        className={clsx({'grayscale100': scorePerDungeon[key][week] === 0}, 'CalcInput')}
                        type='text' autoComplete="off" maxLength='2'
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
                        <IconInputWrapper color={"#ffbb4d"} count={3}>
                            <IconInput
                                name={key + week}
                                icon={<AiFillStar/>}
                                radioOption={radioOption} setRadioOption={setRadioOption}
                                id={key + `_${week[0]}_` + 'star'}
                            />
                        </IconInputWrapper>
                    <input type="range" min="0" max="100" step="1"/>
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
