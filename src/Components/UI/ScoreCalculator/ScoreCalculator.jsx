import React, {useCallback, useState} from 'react';
import Tooltip from "../Tooltip/Tooltip";
import ScoreCalculatorInput from "./ScoreCalculatorInput";
import './ScoreCalculator.css'
import {FaQuestion} from "react-icons/fa";
import TooltipGroup from "../Tooltip/TooltipGroup";
import {GiClick} from "react-icons/gi";
import apiFunctionHandler from "../../../utils/apiFunctionHandler";
import {useFetching} from "../../../hooks/useFetching";

const ScoreCalculator = () => {
    const currentDungeons = ['STRT', 'GMBT', 'YARD', 'WORK', 'ID', 'GD', 'LOWR', 'UPPR']
    let dungeonValues = {}
    currentDungeons.forEach(i => {
            dungeonValues[i] =
                {
                    Best: {
                        mythic_level: 0,
                        num_keystone_upgrades: 0,
                        score: 0,
                        par_time_ms: 0,
                        clear_time_ms: 0,
                    },
                    Alternate: {
                        mythic_level: 0,
                        num_keystone_upgrades: 0,
                        score: 0,
                        par_time_ms: 0,
                        clear_time_ms: 0,
                    },
                }
        }
    )
    const [scorePerDungeon, setScorePerDungeon] = useState(dungeonValues)
    const dungeonWeeks = Object.keys(scorePerDungeon[currentDungeons[0]])

    let sumDungeonScoreValues = 0
    currentDungeons.forEach((item) =>
        dungeonWeeks.forEach(week => {
            week === dungeonWeeks[0]
                ? sumDungeonScoreValues += (scorePerDungeon[item][week].score * 1.5)
                : sumDungeonScoreValues += (scorePerDungeon[item][week].score * 0.5)
        })
    )
    if(sumDungeonScoreValues %2!== 0) sumDungeonScoreValues = sumDungeonScoreValues.toFixed(2)

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
                                inputValue={scorePerDungeon[key][week].mythic_level}
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
