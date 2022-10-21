import React, { useCallback, useRef, useState } from "react"
import ScoreCalculatorInput from "./ScoreCalculatorInput"
import "./ScoreCalculator.css"
import apiFunctionHandler from "../../../utils/apiFunctionHandler"

import merge from "lodash/merge"
import ScoreCalculatorLinks from "./ScoreCalculatorLinks"
import ScoreCalculatorTooltips from "./ScoreCalculatorTooltips"
import { useFetching } from "../../../hooks/useFetching"

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
      Best: {
        mythic_level: 0,
        num_keystone_upgrades: 1,
        score: 0,
        par_time_ms: 0,
      },
      Alternate: {
        mythic_level: 0,
        num_keystone_upgrades: 1,
        score: 0,
        par_time_ms: 0,
      },
    }
  })
  const [scorePerDungeon, setScorePerDungeon] = useState(dungeonValues)
  const dungeonWeeks = Object.keys(scorePerDungeon[currentDungeons[0]])

  let sumDungeonScoreValues = 0
  currentDungeons.forEach(item =>
    dungeonWeeks.forEach(week => {
      sumDungeonScoreValues +=
        scorePerDungeon[item][week]?.score *
        (week === dungeonWeeks[0] ? 1.5 : 0.5)
    })
  )
  if (sumDungeonScoreValues % 2 !== 0)
    sumDungeonScoreValues = sumDungeonScoreValues.toFixed(2)

  const importInput = useRef(undefined)
  const [playerInfo, setPlayerInfo] = useState({})
  const [fetchImportScore] = useFetching(
    useCallback(async importInput => {
      const response = await apiFunctionHandler.getPointsByCharacter(
        "eu",
        "HowlingFjord",
        importInput
      )
      setScorePerDungeon(prevState => merge({}, prevState, response))
    }, [])
  )
  const [fetchPlayerInfo, isPlayerInfoLoading] = useFetching(
    useCallback(async importInput => {
      const response = await apiFunctionHandler.getPlayerIcon(
        "eu",
        "HowlingFjord",
        importInput
      )
      setPlayerInfo(response)
    }, [])
  )

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
        {playerInfo?.data && (
          <ScoreCalculatorLinks
            playerInfo={playerInfo}
            isPlayerInfoLoading={isPlayerInfoLoading}
          />
        )}
        <p className="CalcScore">{sumDungeonScoreValues}</p>
        <div>
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
        <h2 className="content-heading">
          <span>Import Section</span>
        </h2>
        <div className={"importSection"}>
          <select className={"importInput importDropDown importRegion"}>
            <option>us</option>
            <option>eu</option>
            <option>kr</option>
            <option>tw</option>
          </select>
          <input
            ref={importInput}
            className={"importInput"}
            placeholder={"Character Name"}
            onChange={e => {
              importInput.current.value = e.target.value
            }}
          />
          <input
            className={"importInput importDropDown"}
            placeholder={"Realm"}
          />
          <button
            onClick={() => {
              fetchPlayerInfo(importInput.current.value)
              fetchImportScore(importInput.current.value)
            }}
          >
            Import
          </button>
        </div>
      </div>
    </div>
  )
}

export default ScoreCalculator
