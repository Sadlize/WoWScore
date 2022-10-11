import React, { useState } from "react"
import "./Tooltip.css"
import clsx from "clsx"

const Tooltip = ({ children, ...props }) => {
  let timeout
  const [active, setActive] = useState(false)
  const textDecoration = props?.textDecoration
  const position = props?.position || "target"
  const direction = props?.direction
  const target = props?.target
  const color = props?.color

  const showTip = () => {
    timeout = setTimeout(() => {
      setActive(true)
    }, props.delay || 400)
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
      style={{ color: color }}
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
