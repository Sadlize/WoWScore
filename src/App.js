import './App.css';
import {useEffect, useState} from "react";
import RaiderIO from "./API/RaiderIO";

function App() {
    const [cutoffScore, setCutoffScore] = useState({})

    const getCutoff2 = async (region) => {
        const response = await RaiderIO.getCutoff(region)
        setCutoffScore(response)
    }

    useEffect(() => {
        getCutoff2()
    }, [])

    return (
        <div className="App">
            <h1>WoWScore</h1>
            <h1>Affixes</h1>
            <h2>Cutoffs:</h2>
            <p>US: {cutoffScore.us}</p>
            <p>EU: {cutoffScore.eu}</p>
            <p>TW: {cutoffScore.tw}</p>
            <p>KR: {cutoffScore.kr}</p>
        </div>
    );
}

export default App;
