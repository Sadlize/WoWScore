import React from "react"
import clsx from "clsx"
import merge from "lodash/merge"
import { calcPointsForKeyLevel } from "utils/calculatorFunctionHandler"

const IconRadioInput = ({
  count,
  id,
  name,
  icon,
  index,
  week,
  currentOption,
  dungeonStarTimers,
  scorePerDungeon,
  setScorePerDungeon,
}) => {
  const output = []
  let elementIcon

  if (count > 0) {
    for (let i = 0; i <= count; i++) {
      if (i === 0) {
        elementIcon = React.cloneElement(icon, {
          style: { filter: "brightness(0.5)" },
        })
      } else elementIcon = icon
      output.push(
        <div
          key={id + i}
          className={clsx({ grayscale100: currentOption < i }, "star" + i)}
        >
          <input
            checked={currentOption === i}
            type="radio"
            name={name}
            id={id + i}
            onChange={() => {
              if (scorePerDungeon[index][week]?.mythic_level >= 2) {
                setScorePerDungeon(prevState =>
                  merge({}, prevState, {
                    [index]: {
                      [week]: {
                        num_keystone_upgrades: i,
                        clear_time_ms: dungeonStarTimers[i],
                        score: calcPointsForKeyLevel(
                          scorePerDungeon[index][week]?.mythic_level,
                          dungeonStarTimers[i],
                          dungeonStarTimers[3]
                        ),
                      },
                    },
                  })
                )
              }
            }}
          />
          <label htmlFor={id + i}>{elementIcon}</label>
        </div>
      )
    }
  }
  return <>{output}</>
}

export default IconRadioInput
