import RaiderIO from "../API/RaiderIO";

export default class apiFunctionHandler {
    static async getPointsByCharacter(region, realm, name) {
        let response = await RaiderIO.getMPlusBestRuns(region, realm, name, 'best')

        const bestRuns = response?.data?.mythic_plus_best_runs
        let scores = {}
        bestRuns.forEach((i) => {
            scores[i.short_name] = {Tyrannical: i.mythic_level}
        })
        response = await RaiderIO.getMPlusBestRuns(region, realm, name, 'alternate')

        const altRuns = response?.data?.mythic_plus_alternate_runs
        altRuns.forEach((i) => {
            scores[i.short_name].Fortified = i.mythic_level
        })

        return scores
    }
}
