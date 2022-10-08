import RaiderIO from "../API/RaiderIO";
import _ from "lodash";

export default class apiFunctionHandler {
    static async getPointsByCharacter(region, realm, name) {
        let response = await RaiderIO.getMPlusBestRuns(region, realm, name, 'best')
        const bestRuns = response?.data?.mythic_plus_best_runs
        let bestScores = {}
        bestRuns.forEach((i) => {
            bestScores[i.short_name] = {
                Best: {
                    mythic_level: i.mythic_level,
                    num_keystone_upgrades: i.num_keystone_upgrades,
                    score: i.score,
                    par_time_ms: i.par_time_ms,
                    clear_time_ms: i.clear_time_ms,
                }
            }
        })

        response = await RaiderIO.getMPlusBestRuns(region, realm, name, 'alternate')
        const altRuns = response?.data?.mythic_plus_alternate_runs
        let altScores = {}
        altRuns.forEach((i) => {
            altScores[i.short_name] = {
                Alternate: {
                    mythic_level: i.mythic_level,
                    num_keystone_upgrades: i.num_keystone_upgrades,
                    score: i.score,
                    par_time_ms: i.par_time_ms,
                    clear_time_ms: i.clear_time_ms,
                }
            }
        })

        return _.merge(bestScores, altScores)
    }

    static async getPlayerIcon(region, realm, name) {
        return await RaiderIO.getPlayerInfo(region, realm, name)
    }
}
