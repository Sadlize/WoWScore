import React, {useCallback, useState} from 'react';
import Tooltip from "../Tooltip/Tooltip";
import ScoreCalculatorInput from "./ScoreCalculatorInput";
import './ScoreCalculator.css'
import {FaQuestion} from "react-icons/fa";
import TooltipGroup from "../Tooltip/TooltipGroup";
import {GiClick} from "react-icons/gi";
import {calcPointsForKeyLevel} from "../../../utils/calculatorFunctionHandler";
import apiFunctionHandler from "../../../utils/apiFunctionHandler";
import {useFetching} from "../../../hooks/useFetching";

const ScoreCalculator = () => {
    const currentDungeons = ['YARD', 'STRT', 'GD', 'WORK', 'ID', 'GMBT', 'LOWR', 'UPPR']
    let dungeonValues = {}
    currentDungeons.forEach(i => {
            dungeonValues[i] = {Tyrannical: 0, Fortified: 0}
        }
    )
    const [scorePerDungeon, setScorePerDungeon] = useState(dungeonValues)

    // setScorePerDungeon()
    // const currentDungeons = ['YARD', 'STRT', 'GD', 'WORK', 'ID', 'GMBT', 'LOWR', 'UPPR']
    // const currentDungeons = ['YARD']
    // const [scorePerDungeon, setScorePerDungeon] = useState({})
    // currentDungeons.forEach(i => {
    //         scorePerDungeon[i] =
    //             {
    //                 Best: {
    //                     mythic_level: 10,
    //                     num_keystone_upgrades: 0,
    //                     score: 0,
    //                     par_time_ms: 0,
    //                     clear_time_ms: 0,
    //                 },
    //                 Alternate: {
    //                     mythic_level: 0,
    //                     num_keystone_upgrades: 0,
    //                     score: 0,
    //                     par_time_ms: 0,
    //                     clear_time_ms: 0,
    //                 },
    //             }
    //     }
    // )
    // const dungeonKey = Object.keys(scorePerDungeon)
    const dungeonWeeks = Object.keys(scorePerDungeon[currentDungeons[0]])
    // console.log(dungeonKey)
    let sumDungeonScoreValues = 0
    currentDungeons.forEach(item =>
        sumDungeonScoreValues += Object.values(scorePerDungeon[item])
            .sort((a, b) => b - a)
            .reduce((a, b) => (calcPointsForKeyLevel(a) * 1.5) + (calcPointsForKeyLevel(b) * 0.5))
    )

    const [importInput, setImportInput] = useState('')
    const [fetchImportScore] = useFetching(useCallback(async (importInput) => {
        const response = await apiFunctionHandler.getPointsByCharacter('eu', 'HowlingFjord', importInput)
        setScorePerDungeon(response)
    }, []))

    return (
        <div>
            <h2 className='content-heading'><span>Score<br/>Calculator</span></h2>
            <div className='content-block'>
                <TooltipGroup position='top-right'>
                    <Tooltip target={<FaQuestion/>}>
                        The calculated result displays the number of points received for completing the dungeon
                        with the minimum timer. In reality, your result will differ, but not lower than this value.
                    </Tooltip>
                    <Tooltip target={<GiClick/>}>
                        Inputs support MRB click.
                    </Tooltip>
                </TooltipGroup>

                <p className='CalcScore'>{sumDungeonScoreValues}</p>
                {currentDungeons.map((key) => (
                    <div id={key} key={key} className="dungeon-grid">
                        <span>{key}</span>
                        {dungeonWeeks.map(week => (
                            <ScoreCalculatorInput
                                key={key + '' + week}
                                inputValue={scorePerDungeon[key][week]}
                                week={week}
                                index={key}
                                placeholder={'0'}
                                scorePerDungeon={scorePerDungeon}
                                setScorePerDungeon={setScorePerDungeon}
                            />
                        ))}
                    </div>
                ))}
                <h2 className='content-heading'><span>or<br/>Import</span></h2>
                <input value={importInput} onChange={e => {
                    setImportInput(e.target.value)
                }}/>
                <select>
                    <option>eu</option>
                </select>
                <button onClick={() => {
                    fetchImportScore(importInput)
                }}>123
                </button>
            </div>
        </div>
    );
};

export default ScoreCalculator;
