import clsx from "clsx"
import React, { useCallback, useRef, useState } from "react"
import ScoreCalculatorInput from "./ScoreCalculatorInput"
import "./ScoreCalculator.css"
import apiFunctionHandler from "utils/apiFunctionHandler"
import merge from "lodash/merge"
import ScoreCalculatorLinks from "./ScoreCalculatorLinks"
import ScoreCalculatorTooltips from "./ScoreCalculatorTooltips"
import { useFetching } from "hooks/useFetching"

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
        num_keystone_upgrades: 1,
        score: 0,
        par_time_ms: 0,
      },
      Alternate: {
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

  const importCharacterName = useRef(undefined)
  const importCharacterRegion = useRef(undefined)

  const [playerInfo, setPlayerInfo] = useState({})
  const [fetchPlayerData, isPlayerDataLoading] = useFetching(
    useCallback(async (region, name) => {
      let response = await apiFunctionHandler.getPointsByCharacter(
        region,
        "HowlingFjord",
        name
      )
      setScorePerDungeon(prevState => merge({}, prevState, response))

      response = await apiFunctionHandler.getPlayerIcon(
        region,
        "HowlingFjord",
        name
      )
      setPlayerInfo(response)
    }, [])
  )
  console.log(importCharacterName)
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
          <ScoreCalculatorLinks
            playerInfo={playerInfo}
            isPlayerDataLoading={isPlayerDataLoading}
          />
        ) : null}
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
        <form className={"importSection"}>
          <select
            className={"dropDown region"}
            ref={importCharacterRegion}
            onChange={e => {
              importCharacterRegion.current.value = e.target.value
            }}
          >
            <option>us</option>
            <option>eu</option>
            <option>kr</option>
            <option>tw</option>
          </select>
          <input
            ref={importCharacterName}
            placeholder={"Character Name"}
            onChange={e => {
              importCharacterName.current.value = e.target.value
            }}
            required
          />
          <input placeholder={"Realm"} required />
          <button
            type={"submit"}
            className={clsx({
              buttonLoading: isPlayerDataLoading,
            })}
            onClick={() => {
              fetchPlayerData(
                importCharacterRegion.current.value,
                importCharacterName.current.value
              )
            }}
          >
            Import
          </button>
        </form>
      </div>
    </div>
  )
}

export default ScoreCalculator
