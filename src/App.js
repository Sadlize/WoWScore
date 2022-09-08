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
    const [currentAffixes, setCurrentAffixes] = useState('')

    const getCutoff = async (region) => {
        const response = await RaiderIO.getCutoff(region)
        setCutoffScore(response)
    }

    const getCurrentAffixes = async () => {
        const response = await RaiderIO.getCurrentAffixes()
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
            <p>{currentAffixes}</p>
            <h2>Cutoffs:</h2>
            <p>US: {cutoffScore.US}</p>
            <p>EU: {cutoffScore.EU}</p>
            <p>TW: {cutoffScore.TW}</p>
            <p>KR: {cutoffScore.KR}</p>
        </div>
    );
}

export default App;
