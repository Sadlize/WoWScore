import axios from "axios"

export default class RaiderIO {
  /**
   * Returns object with cutoff values for each region
   *
   * @param region - Sampling from a given regions
   * @returns {Promise<{}>} - Result of fetching values for all regions
   */
  static async getCutoff(region) {
    let result = {}
    for (let element in region) {
      let response = await axios.get(
        "https://raider.io/api/v1/mythic-plus/season-cutoffs",
        {
          params: {
            season: "season-sl-4",
            region: region[element],
          },
        }
      )
      result[element] = response?.data?.cutoffs?.p999?.all?.quantileMinValue
    }
    return result
  }

  static async getCurrentAffixes() {
    let response = await axios.get(
      "https://raider.io/api/v1/mythic-plus/affixes",
      {
        params: {
          region: "eu",
          locale: "en",
        },
      }
    )
    return response?.data?.affix_details
  }

  static async getCurrentWeekPeriod() {
    let response = await axios.get("https://raider.io/api/v1/periods")
    response = response?.data?.periods[1]?.current
    let options = { month: "long", day: "numeric" }
    let periodStart = new Date(response?.start).toLocaleString("en-US", options)
    let periodEnd = new Date(response?.end).toLocaleString("en-US", options)
    return periodStart + " – " + periodEnd
  }

  static async getMPlusBestRuns(region, realm, name, run) {
    return await axios.get("https://raider.io/api/v1/characters/profile", {
      params: {
        region: region,
        realm: realm,
        name: name,
        fields: `mythic_plus_${run}_runs`,
      },
    })
  }

  static async getPlayerInfo(region, realm, name) {
    return await axios.get("https://raider.io/api/v1/characters/profile", {
      params: {
        region: region,
        realm: realm,
        name: name,
      },
    })
  }
}
