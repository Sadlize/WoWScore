import axios from "axios";

export default class RaiderIO {
    /**
     * Returns cutoff value for each region in object
     *
     * @param region - Sampling from a given regions
     * @returns {Promise<{}>} - Result of fetching all values
     */
    static async getCutoff(region) {
        let result = {}

        for (let element in region) {
            let response = await axios.get('https://raider.io/api/v1/mythic-plus/season-cutoffs?season=season-sl-4&region=' + region[element])
            result[region[element]] = response.data.cutoffs.p999.all.quantileMinValue
        }

        return result
    }

    static async getCurrentAffixes() {
        let response = await axios.get('https://raider.io/api/v1/mythic-plus/affixes?region=eu&locale=en')
        return response.data.title
    }
}