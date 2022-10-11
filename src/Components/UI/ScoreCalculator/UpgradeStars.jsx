import React from "react"
import { AiFillStar } from "react-icons/ai"

const UpgradeStars = ({ upgrade }) => {
  const output = []
  if (upgrade > 1) {
    for (let i = 0; i < upgrade; i++) {
      output.push(
        <AiFillStar key={"Upgrade" + i} style={{ color: "#ffbb4d" }} />
      )
    }
  }

  return <div className={"UpgradeStars"}>{output}</div>
}

export default UpgradeStars
