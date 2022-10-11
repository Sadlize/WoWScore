import React from "react"
import Tooltip from "../../Tooltip/Tooltip"
import { FaQuestion } from "react-icons/fa"
import { GiClick } from "react-icons/gi"
import TooltipGroup from "../../Tooltip/TooltipGroup"

const ScoreCalculatorTooltips = () => {
  return (
    <TooltipGroup position="top-right">
      <Tooltip target={<FaQuestion />}>
        We highly recommend import your character using the special menu below.
        Otherwise, for a more accurate result use timestamps.
      </Tooltip>
      <Tooltip target={<GiClick />}>Dungeons inputs support MRB click.</Tooltip>
    </TooltipGroup>
  )
}

export default ScoreCalculatorTooltips
