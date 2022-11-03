import React from "react"
import { AiFillStar } from "react-icons/ai"

const UpgradeStars = ({ upgrade }) => {
  const output = []
  if (upgrade > 1) {
    for (let i = 0; i < upgrade; i++) {
      let scale = ""
      if (upgrade === 3 && i === 1) scale = "scale(1.5)"
      output.push(
        <AiFillStar
          key={"Upgrade" + i}
          fill={"#ffbb4d"}
          style={{
            transform: scale,
          }}
          stroke={"black"}
          strokeWidth={"50"}
        />
      )
    }
  }

  return <div className={"upgradeStars"}>{output}</div>
}

export default UpgradeStars
