import axios from "axios";

export default class RaiderIO {
    static async getCutoff() {
        const region = {
            0: 'us',
            1: 'eu',
            2: 'tw',
            3: 'kr',
        }
        let result = {}

        for (let element in region) {
            let response = await axios.get('https://raider.io/api/v1/mythic-plus/season-cutoffs?season=season-sl-4&region=' + region[element])
            result[region[element]] = response.data.cutoffs.p999.all.quantileMinValue
        }

        return result
    }
}