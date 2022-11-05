import ScoreCalculatorImportSection from "Components/UI/ScoreCalculator/ScoreCalculatorImportSection"
import React, { useState } from "react"
import "./ScoreCalculator.css"
import ScoreCalculatorInput from "./ScoreCalculatorInput"
import ScoreCalculatorLinks from "./ScoreCalculatorLinks"
import ScoreCalculatorTooltips from "./ScoreCalculatorTooltips"

const ScoreCalculator = () => {
  const currentDungeons = [
    "STRT",
    "GMBT",
    "YARD",
    "WORK",
    "ID",
    "GD",
    "LOWR",
    "UPPR",
  ]
  let dungeonValues = {}
  currentDungeons.forEach(i => {
    dungeonValues[i] = {
      Tyrannical: {
        num_keystone_upgrades: 1,
        score: 0,
        par_time_ms: 0,
      },
      Fortified: {
        num_keystone_upgrades: 1,
        score: 0,
        par_time_ms: 0,
      },
    }
  })
  const [scorePerDungeon, setScorePerDungeon] = useState(dungeonValues)
  const dungeonWeeks = Object.keys(scorePerDungeon[currentDungeons[0]])

  let sumDungeonScoreValues = 0
  currentDungeons.forEach(
    item =>
      (sumDungeonScoreValues += [
        scorePerDungeon[item]?.Tyrannical?.score,
        scorePerDungeon[item]?.Fortified?.score,
      ]
        .sort((a, b) => b - a)
        .reduce((a, b) => a * 1.5 + b * 0.5))
  )

  if (sumDungeonScoreValues % 2 !== 0)
    sumDungeonScoreValues = sumDungeonScoreValues.toFixed(2)

  const [playerInfo, setPlayerInfo] = useState({})

  return (
    <div>
      <h2 className="content-heading">
        <span>
          Score
          <br />
          Calculator
        </span>
      </h2>
      <div className="content-block scoreCalculator">
        <ScoreCalculatorTooltips />
        {playerInfo?.data ? (
          <ScoreCalculatorLinks playerInfo={playerInfo} />
        ) : null}
        <p className="CalcScore">{sumDungeonScoreValues}</p>
        <div className={"dungeon-wrapper"}>
          <div className="dungeon-grid">
            <img
              src={require("../../../images/affixes/tyrannical.jpg")}
              alt={"Tyrannical"}
            />
            <img
              src={require("../../../images/affixes/fortified.jpg")}
              alt={"Fortified"}
            />
          </div>
          {currentDungeons.map(index => (
            <div id={index} key={index} className="dungeon-grid">
              <span>{index}</span>
              {dungeonWeeks.map(week => (
                <ScoreCalculatorInput
                  key={index + "" + week}
                  inputValue={scorePerDungeon[index][week]?.mythic_level}
                  week={week}
                  index={index}
                  placeholder={"0"}
                  scorePerDungeon={scorePerDungeon}
                  setScorePerDungeon={setScorePerDungeon}
                />
              ))}
            </div>
          ))}
        </div>
        <ScoreCalculatorImportSection
          setScorePerDungeon={setScorePerDungeon}
          setPlayerInfo={setPlayerInfo}
        />
      </div>
    </div>
  )
}

export default ScoreCalculator
