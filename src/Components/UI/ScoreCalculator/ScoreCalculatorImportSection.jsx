import clsx from "clsx"
import { useFetching } from "hooks/useFetching"
import merge from "lodash/merge"
import React, { useCallback, useState } from "react"
import apiFunctionHandler from "utils/apiFunctionHandler"

const ScoreCalculatorImportSection = ({
  setScorePerDungeon,
  setPlayerInfo,
}) => {
  const [importCharacterName, setCharacterName] = useState("")
  const [importCharacterRealm, setCharacterRealm] = useState("")
  const [importCharacterRegion, setCharacterRegion] = useState("")

  const [fetchPlayerData, isPlayerDataLoading] = useFetching(
    useCallback(
      async (region, realm, name) => {
        let response = await apiFunctionHandler.getPointsByCharacter(
          region,
          realm,
          name
        )
        setScorePerDungeon(prevState => merge({}, prevState, response))

        response = await apiFunctionHandler.getPlayerIcon(region, realm, name)
        setPlayerInfo(response)
      },
      [setScorePerDungeon, setPlayerInfo]
    )
  )

  return (
    <>
      <h2 className="content-heading">
        <span>Import Section</span>
      </h2>
      <form className={"importSection"}>
        <select
          className={"dropDown region"}
          onChange={e => {
            setCharacterRegion(e.target.value)
          }}
        >
          <option>us</option>
          <option>eu</option>
          <option>kr</option>
          <option>tw</option>
        </select>
        <input
          value={importCharacterName}
          placeholder={"Character Name"}
          onChange={e => {
            setCharacterName(e.target.value)
          }}
          required
        />
        <input
          value={importCharacterRealm}
          placeholder={"Realm"}
          onChange={e => {
            setCharacterRealm(e.target.value)
          }}
          required
        />
        <button
          disabled={importCharacterName === "" || importCharacterRealm === ""}
          type={"submit"}
          className={clsx({
            buttonLoading: isPlayerDataLoading,
          })}
          onClick={e => {
            e.preventDefault()
            fetchPlayerData(
              importCharacterRegion,
              importCharacterRealm,
              importCharacterName
            )
          }}
        >
          Import
        </button>
      </form>
    </>
  )
}

export default ScoreCalculatorImportSection
