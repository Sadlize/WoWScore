export function calcPointsForKeyLevel(keyLevel) {
    let seasonal = 0
    let affixes = 0
    let base = 0
    let level = 0

    if (keyLevel >= 2) {
        base = 30
        level = keyLevel
    }
    if (keyLevel >= 4) affixes = 1
    if (keyLevel >= 7) affixes = 2
    if (keyLevel >= 15) seasonal = 10

    return base + (level * 5) + (affixes * 5) + seasonal
}
