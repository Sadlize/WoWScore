import React from "react"
import clsx from "clsx"

const TooltipGroup = ({ children, position, color }) => {
  return (
    <div className={clsx("Tooltip-Group", position)} style={{ color }}>
      {children}
    </div>
  )
}

export default TooltipGroup
