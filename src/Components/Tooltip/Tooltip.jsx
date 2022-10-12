import React, { useState } from "react"
import "./Tooltip.css"
import clsx from "clsx"

const Tooltip = ({
  children,
  textDecoration,
  position = "target",
  direction,
  target,
  color,
  delay,
}) => {
  let timeout
  const [active, setActive] = useState(false)

  const showTip = () => {
    timeout = setTimeout(() => {
      setActive(true)
    }, delay || 400)
  }

  const hideTip = () => {
    clearInterval(timeout)
    setActive(false)
  }

  return (
    <div
      className={clsx(textDecoration, position)}
      onMouseEnter={showTip}
      onMouseLeave={hideTip}
      style={{ color }}
    >
      {target}
      {active && (
        <div className={clsx("Tooltip-Tip", direction || "top")}>
          {children}
        </div>
      )}
    </div>
  )
}

export default Tooltip
