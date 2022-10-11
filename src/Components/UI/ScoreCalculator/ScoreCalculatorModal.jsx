import React from "react"
import clsx from "clsx"

const ScoreCalculatorModal = ({ children, visible, setVisible }) => {
  return (
    <div
      className={clsx("CalcModal", { active: visible === true })}
      onClick={() => setVisible(false)}
    >
      <div className={"CalcModalContent"} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  )
}

export default ScoreCalculatorModal
