import React, { useCallback, useEffect, useState } from "react"
import { useFetching } from "../../../hooks/useFetching"
import RaiderIO from "../../../API/RaiderIO"

const CutoffScores = ({ region }) => {
  const [cutoffScore, setCutoffScore] = useState({})
  const [fetchCutoffScore, isCutoffLoading] = useFetching(
    useCallback(async region => {
      const response = await RaiderIO.getCutoff(region)
      setCutoffScore(response)
    }, [])
  )

  useEffect(() => {
    fetchCutoffScore(region)
  }, [fetchCutoffScore, region])

  return (
    <div>
      <h2 className="content-heading">
        <span>
          Cutoff
          <br />
          Scores
        </span>
      </h2>
      <div className="content-block">
        {isCutoffLoading ? (
          <h1>Loading cutoffs...</h1>
        ) : (
          <>
            <span>US: {cutoffScore.US}</span>
            <span>EU: {cutoffScore.EU}</span>
            <span>TW: {cutoffScore.TW}</span>
            <span>KR: {cutoffScore.KR}</span>
          </>
        )}
      </div>
    </div>
  )
}

export default CutoffScores
