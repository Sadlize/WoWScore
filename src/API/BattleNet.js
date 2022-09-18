import axios from "axios";

export default class BattleNet {

    static async getMythicKeystoneAffixesIndex() {

        let response = await axios.get(
            'https://eu.api.blizzard.com/data/wow/keystone-affix/index',
            {
                params: {
                    namespace: 'static-eu',
                    locale: 'en_US',
                    access_token: 'USF31DBZBIxngaph1GvzaMPeO61tH4Yenj'
                }
            })

        return response?.data
    }

    static async getMythicKeystoneAffixDescByIndex(index) {
        let response = await axios.get(
            'https://eu.api.blizzard.com/data/wow/keystone-affix/' + index,
            {
                params: {
                    namespace: 'static-eu',
                    locale: 'en_US',
                    access_token: 'USF31DBZBIxngaph1GvzaMPeO61tH4Yenj'
                }
            })
        return response?.data
    }

    static async getMythicKeystoneAffixMediaByIndex(index) {
        let response = await axios.get(
            'https://eu.api.blizzard.com/data/wow/media/keystone-affix/' + index,
            {
                params: {
                    namespace: 'static-eu',
                    locale: 'en_US',
                    access_token: 'USF31DBZBIxngaph1GvzaMPeO61tH4Yenj'
                }
            })
        return response?.data
    }

    static async test() {
        let result = {}
        const test = await BattleNet.getMythicKeystoneAffixesIndex()

        for (const i of test?.affixes) {
            result[i.name] = {}
            result[i.name].id = i.id
            result[i.name].name = i.name
            let mediaResponse = await BattleNet.getMythicKeystoneAffixMediaByIndex(i.id)
            result[i.name].icon = mediaResponse?.assets[0]?.value
        }

        return result
    }
}