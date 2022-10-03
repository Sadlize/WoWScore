import './App.css';
import CutoffScores from "./Components/UI/CutoffScores/CutoffScores";
import ScoreCalculator from "./Components/UI/ScoreCalculator/ScoreCalculator";
import Tab from "./Components/Tab/Tab";
import CurrentAffixes from "./Components/UI/Affixes/CurrentAffixes";
import AffixesSchedule from "./Components/UI/Affixes/AffixesSchedule";
import React from "react";
import {GiChemicalArrow} from "react-icons/gi";

function App() {

    const region = {
        US: 'US',
        EU: 'EU',
        TW: 'TW',
        KR: 'KR',
    }

    // const getDateDifference = () => {
    //     const date1 = new Date();
    //     const date2 = new Date('12/31/2022');
    //     const diffTime = Math.abs(date2 - date1);
    //     const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    //     console.log(diffDays + " days left");
    // }
    return (
        <div className="App">
            <div style={{display: "inline-flex", alignItems: 'center'}}>
                <GiChemicalArrow size='3em'/>
                <h1>WoWScore</h1>
                <GiChemicalArrow size='3em'/>
            </div>

            <div className='content-box'>
                <Tab title={'Affixes'}>
                    <CurrentAffixes title={'Current'}/>
                    <AffixesSchedule title={'Schedule'}/>
                </Tab>
                <CutoffScores region={region}/>
                <ScoreCalculator/>

            </div>

        </div>
    );
}

export default App;
