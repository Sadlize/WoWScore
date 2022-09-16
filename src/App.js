import './App.css';
import CutoffScores from "./Components/UI/CutoffScores/CutoffScores";
import CurrentAffixes from "./Components/UI/Affixes/CurrentAffixes";
import AffixesSchedule from "./Components/UI/Affixes/AffixesSchedule";

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
            <h1>WoWScore</h1>

            <div className='content-box'>
                <AffixesSchedule/>
                <CurrentAffixes/>
                <CutoffScores region={region}/>
            </div>

        </div>
    );
}

export default App;
