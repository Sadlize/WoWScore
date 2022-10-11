export function calcPointsForKeyLevel(keyLevel, timeStamp, rangeMax) {
  let seasonal = 0
  let affixes = 0
  let base = 0
  let level = 0
  let bonusTimeStampPoints = 0

  if (keyLevel >= 2) {
    base = 30
    level = keyLevel
    const timeStampMultiplier = timeStamp / (rangeMax * 0.02)
    bonusTimeStampPoints = 0.1 * timeStampMultiplier
    if (timeStampMultiplier < 0) bonusTimeStampPoints = bonusTimeStampPoints - 5
  }
  if (keyLevel >= 4) affixes = 1
  if (keyLevel >= 7) affixes = 2
  if (keyLevel >= 15) seasonal = 10
  const defaultPoints = base + level * 5 + affixes * 5 + seasonal
  return defaultPoints + bonusTimeStampPoints
}
