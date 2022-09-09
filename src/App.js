import './App.css';
import {useEffect, useState} from "react";
import RaiderIO from "./API/RaiderIO";

function App() {

    const region = {
        US: 'US',
        EU: 'EU',
        TW: 'TW',
        KR: 'KR',
    }

    const [cutoffScore, setCutoffScore] = useState({})
    const [currentAffixes, setCurrentAffixes] = useState({})

    const getCutoff = async (region) => {
        const response = await RaiderIO.getCutoff(region)
        setCutoffScore(response)
    }

    const getCurrentAffixes = async () => {
        const response = await RaiderIO.getCurrentAffixes()
        console.log('Ответ с функции: ', response)
        setCurrentAffixes(response)
    }

    useEffect(() => {
        getCurrentAffixes()
        getCutoff(region)
    }, [])

    return (
        <div className="App">
            <h1>WoWScore</h1>
            <h1>Affixes</h1>
            <p>7-14th September</p>
            <img src={"https://wow.zamimg.com/images/wow/icons/large/ability_toughness.jpg"} alt={'Affix Tooltip'}/>
            <img src={"https://wow.zamimg.com/images/wow/icons/large/spell_holy_prayerofspirit.jpg"} alt={'Affix Tooltip'}/>
            <img src={"https://wow.zamimg.com/images/wow/icons/large/ability_backstab.jpg"} alt={'Affix Tooltip'}/>
            <img src={"https://wow.zamimg.com/images/wow/icons/large/spell_shadow_nethercloak.jpg"} alt={'Affix Tooltip'}/>
            {/*<img src={"https://render.worldofwarcraft.com/eu/icons/56/"+ currentAffixes + ".jpg"} alt={''}/>*/}

            <p>{currentAffixes.title}</p>
            <h2>Cutoffs:</h2>
            <p>US: {cutoffScore.US}</p>
            <p>EU: {cutoffScore.EU}</p>
            <p>TW: {cutoffScore.TW}</p>
            <p>KR: {cutoffScore.KR}</p>
        </div>
    );
}

export default App;
