import './App.css';
import CutoffScores from "./Components/UI/CutoffScores/CutoffScores";
import ScoreCalculator from "./Components/UI/Calculator/ScoreCalculator";
import Tabs from "./Components/UI/TabComponent/Tabs";

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
                {/*<AffixesSchedule/>*/}
                {/*<CurrentAffixes/>*/}

                <Tabs/>
                <CutoffScores region={region}/>
                <ScoreCalculator/>
            </div>

        </div>
    );
}

export default App;
