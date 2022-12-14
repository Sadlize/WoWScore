import React, { useCallback, useEffect, useState } from "react"
import { useFetching } from "hooks/useFetching"
import BattleNet from "API/BattleNet"

const AffixesSchedule = () => {
  /**
   *  List of all affixes
   *  in the game
   */
  const [affixesList, setAffixesList] = useState(undefined)
  const [fetchAffixesList, isAffixesListLoading, isAffixesListError] =
    useFetching(
      useCallback(async () => {
        const response = await BattleNet.test()
        setAffixesList(response)
      }, [])
    )

  /**
   *  CurrentAffixes Schedule for 12 weeks
   */
  const affixesSchedule = {
    season: "Shrouded",
    1: ["Tyrannical", "Inspiring", "Quaking"],
    2: ["Fortified", "Sanguine", "Grievous"],
    3: ["Tyrannical", "Bolstering", "Explosive"],
    4: ["Fortified", "Bursting", "Storming"],
    5: ["Tyrannical", "Raging", "Volcanic"],
    6: ["Fortified", "Inspiring", "Grievous"],
    7: ["Tyrannical", "Spiteful", "Necrotic"],
    8: ["Fortified", "Bolstering", "Quaking"],
    9: ["Tyrannical", "Sanguine", "Storming"],
    10: ["Fortified", "Raging", "Explosive"],
    11: ["Tyrannical", "Bursting", "Volcanic"],
    12: ["Fortified", "Spiteful", "Necrotic"],
  }

  const weeks = Object.keys(affixesSchedule).filter(item => item !== "season")
  weeks.forEach(item => affixesSchedule[item].push(affixesSchedule.season))

  useEffect(() => {
    fetchAffixesList()
  }, [fetchAffixesList])

  return (
    <div>
      <div className="content-block">
        {isAffixesListLoading ? (
          <span>Loading affixes schedule...</span>
        ) : (
          <>
            {isAffixesListError ? (
              <span>Request error</span>
            ) : affixesList !== undefined ? (
              weeks.map(key => (
                <div key={key}>
                  {affixesSchedule[key].map(affix => (
                    <a
                      key={affixesList[affix]?.name + "_" + key}
                      href={
                        "https://www.wowhead.com/affix=" +
                        affixesList[affix]?.id
                      }
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      <img
                        src={affixesList[affix]?.icon}
                        alt={affixesList[affix]?.name}
                      />
                    </a>
                  ))}
                </div>
              ))
            ) : null}
          </>
        )}
      </div>
    </div>
  )
}

export default AffixesSchedule
