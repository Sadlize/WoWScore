import React, {useState} from 'react';
import Tooltip from "../Tooltip/Tooltip";
import ScoreCalculatorInput from "./ScoreCalculatorInput";
import './ScoreCalculator.css'
import {FaQuestion} from "react-icons/fa";
import TooltipGroup from "../Tooltip/TooltipGroup";
import {GiClick} from "react-icons/gi";

const ScoreCalculator = () => {

    const [scorePerDungeon, setScorePerDungeon] = useState(
        {
            STRT: {Tyrannical: 0, Fortified: 0},
            GMBT: {Tyrannical: 0, Fortified: 0},
            YARD: {Tyrannical: 0, Fortified: 0},
            WORK: {Tyrannical: 0, Fortified: 0},
            ID: {Tyrannical: 0, Fortified: 0},
            GD: {Tyrannical: 0, Fortified: 0},
            LOWR: {Tyrannical: 0, Fortified: 0},
            UPPR: {Tyrannical: 0, Fortified: 0},
        })
    const dungeonKey = Object.keys(scorePerDungeon)
    const dungeonWeeks = Object.keys(scorePerDungeon[dungeonKey[0]])

    let sumDungeonScoreValues = 0
    dungeonKey.forEach(item =>
        sumDungeonScoreValues += Object.values(scorePerDungeon[item])
            .sort((a, b) => b - a)
            .reduce((a, b) => (a * 1.5) + (b * 0.5))
    )

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
                {dungeonKey.map((key) => (
                    <div id={key} key={key} className="dungeon-grid">
                        <span>{key}</span>
                        {dungeonWeeks.map(week => (
                            <ScoreCalculatorInput
                                key={key + '' + week}
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
                <input/>
                <select>
                    <option>eu</option>
                </select>
                <button>123</button>
            </div>
        </div>
    );
};

export default ScoreCalculator;
