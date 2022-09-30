import React, {useState} from 'react';
import clsx from "clsx";
import {calcPointsForKeyLevel} from "../../../utils/ScoreCalculator/calcPointsForKeyLevel";
import ScoreCalculatorModal from "./ScoreCalculatorModal";
import {IconContext} from "react-icons";
import {AiFillStar} from "react-icons/ai";


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
    console.log(radioOption)
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
                    <div className="test">
                        <IconContext.Provider value={{color: "#ffbb4d"}}>
                            <input
                                checked={radioOption === 0}
                                type="radio" name={key + '_stars_' + week[0]}
                                id={key + '_star_' + week[0]}
                                onChange={(() => {
                                    setRadioOption(0)
                                })}
                            />
                            <label
                                htmlFor={key + '_star_' + week[0]}
                            >
                                <AiFillStar/>
                            </label>
                        </IconContext.Provider>
                        <IconContext.Provider value={{color: "#ffbb4d"}}>
                            <input
                                checked={radioOption === 1}
                                type="radio" name={key + '_stars_' + week[0]}
                                id={key + '_2star_' + week[0]}
                                onChange={(() => {
                                    setRadioOption(1)
                                })}
                            />
                            <label
                                htmlFor={key + '_2star_' + week[0]}
                                className={clsx({'grayscale100': radioOption < 1})}
                            >
                                <AiFillStar/>
                            </label>
                        </IconContext.Provider>
                        <IconContext.Provider value={{color: "#ffbb4d"}}>
                            <input
                                checked={radioOption === 2}
                                type="radio" name={key + '_stars_' + week[0]}
                                id={key + '_3star_' + week[0]}
                                onChange={(() => {
                                    setRadioOption(2)
                                })}
                            />
                            <label
                                htmlFor={key + '_3star_' + week[0]}
                                className={clsx({'grayscale100': radioOption < 2})}
                            >
                                <AiFillStar/>
                            </label>
                        </IconContext.Provider>
                    </div>
                    <input type="range" min="0" max="100" step="1"/>
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
